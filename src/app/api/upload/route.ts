import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import '@/lib/worker'; // Ensure worker is initialized

const UPLOAD_DIR = path.join(process.cwd(), '.tmp', 'uploads');
const DOWNLOAD_DIR = path.join(process.cwd(), '.tmp', 'downloads');

// Ensure directories exist
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const targetFormat = formData.get('targetFormat') as string;
    const sessionId = formData.get('sessionId') as string | null;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const jobId = uuidv4();
    const originalName = file.name;
    
    // We sanitize the filename just in case
    const safeName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const inputPath = path.join(UPLOAD_DIR, `${jobId}-${safeName}`);

    // High performance streaming: instead of keeping the file in memory buffer,
    // we pipe the incoming web stream directly to disk.
    const webStream = file.stream();
    // @ts-ignore - Web stream to Node stream interop is safe here
    const nodeStream = Readable.fromWeb(webStream);
    const writeStream = fs.createWriteStream(inputPath);
    await pipeline(nodeStream, writeStream);

    // Insert job into queue
    const stmt = db.prepare(`
      INSERT INTO jobs (id, original_name, category, target_format, input_path, created_at, session_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(jobId, originalName, category, targetFormat, inputPath, Date.now(), sessionId || null);

    return NextResponse.json({ jobId });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
