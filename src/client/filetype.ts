import { openSync, readSync, closeSync } from "node:fs";

 // If the bytes of a file starts with one of these, it's a binary executable
const EXECUTABLE_SIGNATURES = [
  "7f454c46",
  "feedface",
  "feedfacf",
  "cffaedfe",
  "cafebabe",
  "4d5a",
];

// Checks if file is a binary executable
export function isBinaryExecutable(filePath: string): boolean {
  // Place to store the first 4 bytes of the file
  const buffer = Buffer.alloc(4);
  // Open the file to read the bytes
  const fileHandle = openSync(filePath, "r");

  // Reads the first for bytes of the file into the buffer
  readSync(fileHandle, buffer, 0, 4, 0);
  closeSync(fileHandle);

  // Turns the bytes into a readable string
  const firstBytes = buffer.toString("hex");
  // Returns true if it matches one of the EXECUTABLE_SIGNATURES
  return EXECUTABLE_SIGNATURES.some((signature) =>
    firstBytes.startsWith(signature)
  );
}
