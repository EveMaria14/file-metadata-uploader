import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { FileMetadata } from "../shared/types.js";

export function scanDirectory(root: string, currentDir = root): FileMetadata[] {
  const results: FileMetadata[] = [];
  // Get all files and folders in the current directory
  const entries = readdirSync(currentDir, { withFileTypes: true });

  // Loop through each file/folder
  for (const entry of entries) {
    const fullPath = join(currentDir, entry.name);

    if (entry.isDirectory()) {
      // If it's a folder, recursively scan it (process its contents)
      const filesInSubfolder = scanDirectory(root, fullPath);
      // Push file results from the subfolder(s) into the main results array
      results.push(...filesInSubfolder);
    } else if (entry.isFile()) {
      // If it's a file, push its metadata to the results array
      const metadata = statSync(fullPath);
      results.push({
        filePath: relative(root, fullPath),
        fileSize: metadata.size,
      });
    }
  }

  return results;
}
