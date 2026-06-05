import { NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';
import { Readable } from 'stream';

export async function GET(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  try {
    const resolvedParams = await params;
    const jobId = resolvedParams.jobId;
    
    const stmt = db.prepare('SELECT status, output_path, original_name, target_format FROM jobs WHERE id = ?');
    const job = stmt.get(jobId) as { status: string, output_path: string | null, original_name: string, target_format: string } | undefined;

    if (!job || job.status !== 'done' || !job.output_path || !fs.existsSync(job.output_path)) {
      return NextResponse.json({ error: 'File not found or not ready' }, { status: 404 });
    }

    // Record download timestamp for retention logic
    try {
      db.prepare('UPDATE jobs SET downloaded_at = ? WHERE id = ?').run(Date.now(), jobId);
    } catch (e) {
      console.error('Failed to update downloaded_at:', e);
    }

    const stat = fs.statSync(job.output_path);
    // Use a large highWaterMark (1MB) to stream chunks much faster
    const fileStream = fs.createReadStream(job.output_path, { highWaterMark: 1024 * 1024 });
    
    const ext = job.original_name.split('.').pop() || '';
    // Replace the last occurrence of the extension to ensure correct filename
    const newName = job.original_name.endsWith(`.${ext}`) 
      ? job.original_name.slice(0, -ext.length - 1) + `.${job.target_format}`
      : `${job.original_name}.${job.target_format}`;

    // High-performance streaming:
    // Convert Node readable stream to Web ReadableStream directly using native toWeb
    // This handles backpressure automatically and is significantly faster
    const webStream = Readable.toWeb(fileStream) as any as ReadableStream;

    return new NextResponse(webStream, {
      headers: {
        'Content-Disposition': `attachment; filename="${newName}"`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': stat.size.toString(),
      },
    });
  } catch (err) {
    console.error('Download error:', err);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
