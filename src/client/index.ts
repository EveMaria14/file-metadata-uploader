import { scanDirectory } from "./scanner.js";

const root = process.argv[2];
if (!root) {
  console.error("Input a directory like this: npm run scan -- <directory>");
  process.exit(1);
}

const files = scanDirectory(root);
console.log(files);
console.log(`\n${files.length} files found`);
