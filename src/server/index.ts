import express from "express";
import { saveFiles, getRecentFiles } from "./store.js";
import { FileMetadata } from "../shared/types.js";

const app = express();
app.use(express.json());

const PORT = 3000;

// POST /files — client sends an array of file metadata in the body
app.post("/files", (req, res) => {
  const files = req.body as FileMetadata[];

  if (!Array.isArray(files)) {
    res.status(400).json({ error: "Expected an array of files" });
    return;
  }

  saveFiles(files);
  res.status(201).json({ saved: files.length });
});

// GET /files?limit=20 — returns the most recently uploaded files
app.get("/files", (req, res) => {
  // if limit not provided, default to 20
  const limit = Number(req.query.limit) || 20;
  res.json(getRecentFiles(limit));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
