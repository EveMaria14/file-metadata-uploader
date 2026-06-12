import Database from "better-sqlite3";
import { FileMetadata } from "../shared/types.js";

// Create the database file
const db = new Database("data/files.db");

// Create the table if it doesn't already exist
db.exec(`
  CREATE TABLE IF NOT EXISTS files (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path     TEXT    NOT NULL,
    file_size     INTEGER NOT NULL,
    last_modified TEXT
  )
`);

const insertStatement = db.prepare(`
  INSERT INTO files (file_path, file_size, last_modified)
  VALUES (@filePath, @fileSize, @lastModified)
`);

const recentStatement = db.prepare(`
  SELECT file_path AS filePath, file_size AS fileSize, last_modified AS lastModified
  FROM files
  ORDER BY id DESC
  LIMIT ?
`);

// Inserts a batch of files in a single transaction
const insertManyFiles = db.transaction((files: FileMetadata[]) => {
  for (const file of files) {
    insertStatement.run({
      filePath: file.filePath,
      fileSize: file.fileSize,
      lastModified: file.lastModified ?? null,
    });
  }
});

// Saves a batch of files to the database
export function saveFiles(files: FileMetadata[]): void {
  insertManyFiles(files);
}

// returns the most recently uploaded files - up to specified limit
export function getRecentFiles(limit: number): FileMetadata[] {
  return recentStatement.all(limit) as FileMetadata[];
}
