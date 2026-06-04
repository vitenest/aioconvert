import db from './db';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DOWNLOAD_DIR = path.join(process.cwd(), '.tmp', 'downloads');

// Worker Loop
async function processQueue() {
  try {
    const job = db.prepare('SELECT * FROM jobs WHERE status = "pending" ORDER BY created_at ASC LIMIT 1').get() as {
      id: string;
      category: string;
      input_path: string;
      original_name: string;
      target_format: string;
    } | undefined;
    
    if (!job) {
      setTimeout(processQueue, 1000); // Poll every second if empty
      return;
    }

    db.prepare('UPDATE jobs SET status = "processing", progress = 5 WHERE id = ?').run(job.id);

    const safeName = job.original_name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const ext = safeName.split('.').pop() || '';
    const newName = safeName.endsWith(`.${ext}`) ? safeName.slice(0, -ext.length - 1) + `.${job.target_format}` : `${safeName}.${job.target_format}`;
    const outputPath = path.join(DOWNLOAD_DIR, `${job.id}-${newName}`);

    try {
      if (job.category === 'image') {
        db.prepare('UPDATE jobs SET progress = 50 WHERE id = ?').run(job.id);
        
        // Native High-Performance Image Conversion
        await sharp(job.input_path)
          .toFormat(job.target_format as keyof sharp.FormatEnum, { quality: 90 })
          .toFile(outputPath);
          
        db.prepare('UPDATE jobs SET status = "done", progress = 100, output_path = ?, completed_at = ? WHERE id = ?')
          .run(outputPath, Date.now(), job.id);
      } else {
        // For video, audio, document, archive: simulate heavy processing delay
        // In production, this is where FFmpeg/LibreOffice execution goes
        for (let i = 1; i <= 4; i++) {
          await new Promise(res => setTimeout(res, 800)); // Simulate delay
          db.prepare('UPDATE jobs SET progress = ? WHERE id = ?').run(i * 20, job.id);
        }
        
        // Mock output by copying input file so the download succeeds
        fs.copyFileSync(job.input_path, outputPath);

        db.prepare('UPDATE jobs SET status = "done", progress = 100, output_path = ?, completed_at = ? WHERE id = ?')
          .run(outputPath, Date.now(), job.id);
      }
    } catch (conversionErr: any) {
      console.error(`Job ${job.id} failed:`, conversionErr);
      db.prepare('UPDATE jobs SET status = "error", error_message = ? WHERE id = ?').run(conversionErr.message, job.id);
    }

  } catch (err) {
    console.error('Worker loop error:', err);
  }

  // Continue loop immediately for next job
  setTimeout(processQueue, 50);
}

// Ensure it only runs once per node process
if (!(global as any).__workerStarted) {
  (global as any).__workerStarted = true;
  console.log('🚀 Background Worker Started');
  processQueue();
}
