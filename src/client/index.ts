import { scanDirectory } from "./scanner.js";
import { uploadFiles } from "./uploader.js";

const root = process.argv[2];
if (!root) {
  console.error("Input a directory like this: npm run scan -- <directory>");
  process.exit(1);
}

const files = scanDirectory(root);
console.log(files);
console.log(`${files.length} files found, uploading...`);

await uploadFiles(files);
console.log("Done.");
