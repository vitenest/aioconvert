import { NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';

export async function GET(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  try {
    const resolvedParams = await params;
    const jobId = resolvedParams.jobId;
    
    const stmt = db.prepare('SELECT status, output_path, original_name, target_format FROM jobs WHERE id = ?');
    const job = stmt.get(jobId) as { status: string, output_path: string | null, original_name: string, target_format: string } | undefined;

    if (!job || job.status !== 'done' || !job.output_path || !fs.existsSync(job.output_path)) {
      return NextResponse.json({ error: 'File not found or not ready' }, { status: 404 });
    }

    const stat = fs.statSync(job.output_path);
    const fileStream = fs.createReadStream(job.output_path);
    
    const ext = job.original_name.split('.').pop() || '';
    // Replace the last occurrence of the extension to ensure correct filename
    const newName = job.original_name.endsWith(`.${ext}`) 
      ? job.original_name.slice(0, -ext.length - 1) + `.${job.target_format}`
      : `${job.original_name}.${job.target_format}`;

    // Convert Node readable stream to Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk));
        fileStream.on('end', () => controller.close());
        fileStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      }
    });

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
