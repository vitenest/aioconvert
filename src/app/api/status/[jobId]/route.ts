import { NextResponse } from 'next/server';
import db from '@/lib/db';
import '@/lib/worker'; // Ensure worker is initialized

export async function GET(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  try {
    const resolvedParams = await params;
    const jobId = resolvedParams.jobId;
    
    const stmt = db.prepare('SELECT status, progress, error_message FROM jobs WHERE id = ?');
    const job = stmt.get(jobId) as { status: string, progress: number, error_message: string | null } | undefined;

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({
      status: job.status,
      progress: job.progress,
      downloadUrl: job.status === 'done' ? `/api/download/${jobId}` : null,
      error: job.error_message
    });
  } catch (err) {
    console.error('Status error:', err);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}
