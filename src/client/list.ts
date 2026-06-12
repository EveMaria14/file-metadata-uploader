import { FileMetadata } from "../shared/types.js";

const SERVER_URL = "http://localhost:3000/files";

// Optional limit argument e.g. npm run list -- 5 (defaults 20)
const limit = Number(process.argv[2]) || 20;

const response = await fetch(`${SERVER_URL}?limit=${limit}`);
if (!response.ok) {
  console.error(`Server responded with status ${response.status}`);
  process.exit(1);
}

const files = (await response.json()) as FileMetadata[];
console.log(`${files.length} most recently uploaded files:`);
console.log(files);
