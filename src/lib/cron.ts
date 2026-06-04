import cron from 'node-cron';
import db from './db';
import fs from 'fs';

// Run every minute
cron.schedule('* * * * *', () => {
  try {
    const now = Date.now();
    const THIRTY_MINUTES = 30 * 60 * 1000;
    const FORTY_FIVE_MINUTES = 45 * 60 * 1000;

    const expiredJobs = db.prepare(`
      SELECT id, input_path, output_path 
      FROM jobs 
      WHERE status = 'done' 
        AND (
          (downloaded_at IS NOT NULL AND completed_at < ?)
          OR
          (downloaded_at IS NULL AND completed_at < ?)
        )
    `).all(now - THIRTY_MINUTES, now - FORTY_FIVE_MINUTES) as {
      id: string;
      input_path: string;
      output_path: string | null;
    }[];

    if (expiredJobs.length > 0) {
      console.log(`🧹 Auto-deletion Cron: Found ${expiredJobs.length} expired jobs. Cleaning up...`);
      
      const deleteStmt = db.prepare('DELETE FROM jobs WHERE id = ?');
      
      expiredJobs.forEach(job => {
        try {
          if (fs.existsSync(job.input_path)) fs.unlinkSync(job.input_path);
          if (job.output_path && fs.existsSync(job.output_path)) fs.unlinkSync(job.output_path);
          
          deleteStmt.run(job.id);
          console.log(`✅ Deleted files for job: ${job.id}`);
        } catch (fileErr) {
          console.error(`Failed to delete files for job ${job.id}:`, fileErr);
        }
      });
    }
  } catch (err) {
    console.error('Cron job error:', err);
  }
});

if (!(global as any).__cronStarted) {
  (global as any).__cronStarted = true;
  console.log('🕒 15-Minute Auto-Deletion Cron Job Scheduled');
}
