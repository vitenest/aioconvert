import cron from 'node-cron';
import db from './db';
import fs from 'fs';

// Run every minute
cron.schedule('* * * * *', () => {
  try {
    // 15 minutes in milliseconds
    const FIFTEEN_MINUTES = 15 * 60 * 1000;
    const cutoffTime = Date.now() - FIFTEEN_MINUTES;

    const expiredJobs = db.prepare('SELECT id, input_path, output_path FROM jobs WHERE status = "done" AND completed_at < ?').all(cutoffTime) as {
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
