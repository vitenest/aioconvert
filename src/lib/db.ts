import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), '.data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// In Next.js App Router, global ensures the connection isn't recreated on every hot-reload in dev
const globalForDb = global as unknown as { db: Database.Database };

const db = globalForDb.db || new Database(path.join(DB_DIR, 'queue.db'), { 
  // verbose: console.log 
});

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

// Enable WAL mode for high concurrency writes
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, done, error
    progress INTEGER NOT NULL DEFAULT 0,
    original_name TEXT NOT NULL,
    category TEXT NOT NULL,
    target_format TEXT NOT NULL,
    input_path TEXT NOT NULL,
    output_path TEXT,
    error_message TEXT,
    created_at INTEGER NOT NULL,
    completed_at INTEGER,
    session_id TEXT,
    downloaded_at INTEGER
  )
`);

try {
  db.exec(`ALTER TABLE jobs ADD COLUMN session_id TEXT`);
} catch (e) {
  // Ignore if column exists
}

try {
  db.exec(`ALTER TABLE jobs ADD COLUMN downloaded_at INTEGER`);
} catch (e) {
  // Ignore if column exists
}

export default db;
