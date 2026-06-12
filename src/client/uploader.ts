import { FileMetadata } from "../shared/types.js";

const SERVER_URL = "http://localhost:3000/files";
const BATCH_SIZE = 50;

// Sends one batch of files to the server
async function uploadBatch(batch: FileMetadata[]): Promise<void> {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batch),
  });

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }
}

// Splits the files into batches and uploads them one batch at a time
export async function uploadFiles(files: FileMetadata[]): Promise<void> {
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    await uploadBatch(batch);
    console.log(`Uploaded ${batch.length} files`);
  }
}
