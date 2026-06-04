import { NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const sessionId = await req.text();
    
    if (!sessionId) {
      return NextResponse.json({ error: 'No session id' }, { status: 400 });
    }

    // Find all jobs for this session
    const jobs = db.prepare('SELECT id, input_path, output_path FROM jobs WHERE session_id = ?').all(sessionId) as {
      id: string;
      input_path: string;
      output_path: string | null;
    }[];

    if (jobs.length > 0) {
      const deleteStmt = db.prepare('DELETE FROM jobs WHERE id = ?');
      
      jobs.forEach(job => {
        try {
          if (fs.existsSync(job.input_path)) fs.unlinkSync(job.input_path);
          if (job.output_path && fs.existsSync(job.output_path)) fs.unlinkSync(job.output_path);
          deleteStmt.run(job.id);
        } catch (e) {
          console.error(`Failed to cleanup job ${job.id} for session ${sessionId}:`, e);
        }
      });
      console.log(`🧹 Session Cleanup: Deleted ${jobs.length} jobs for session ${sessionId}`);
    }

    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error('Cleanup error:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
