# Coding Exercise: File Metadata Uploader

Build a small system with a **client** and a **server**.

The client scans a folder on disk and sends metadata about each file to the server.
The server stores the metadata and can report how many files have been uploaded.

This exercise is intended to be small but realistic.

Part of the interview will involve **walking through your code and design decisions**, so aim for clarity and simplicity rather than over-engineering.

---

## Requirements

### Client

Create a CLI program that:

1. Accepts a directory path as input, for example:

   ```
   binary-scan ./my-folder
   ```

2. Recursively scans the directory.
3. For each file, sends metadata to the server:
   - file path (relative to the root directory is fine)
   - file size
   - last modified time **only if the file is a binary, executable file** i.e. ignore plaintext and image files
4. Sends the data over HTTP.
5. Handles temporary network failures in a reasonable way (for example: retrying requests or reporting errors).

You may send files one-by-one or in batches — your choice.

---

### Server

Create a server that:

1. Accepts file metadata via:

   ```
   POST /files
   ```

2. Stores the data persistently (database or file storage — either is fine as long as data survives restart).
3. Provides:

   ```
   GET /files?limit=20
   ```

   which returns a list of recently uploaded files.

The server should be able to restart without losing stored data.

---

## Deliverables

Please provide:

- Client code
- Server code
- Instructions for how to run both
- Any setup steps required (database, environment variables, etc.)

Keep the setup simple so it can be run locally.

---

## Notes

- You may use any programming language or framework.
- Focus on correctness, structure, and readability.
- You do not need to handle huge production scale.
- Part of the interview will involve reviewing your implementation, so be prepared to explain:
  - how your client sends data
  - how the server stores it
  - how you handled errors or edge cases
