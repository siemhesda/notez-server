import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001; // You can use any port you prefer

app.use(express.json());
app.use(cors()); // Allow cross-origin requests

const notesFfilePath = path.join(process.cwd(), "notes.json");

//fs.writeFileSync

// Get all notes
app.get("/api/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(notesFfilePath));

  res.json(data);
});

// Add a new note
app.post("/api/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(notesFfilePath));
  const newNote = req.body;
  data.push(newNote);
  fs.writeFileSync(notesFfilePath, JSON.stringify(data, null, 2));
  res.status(201).json(newNote);
});

// Ddelete a note
app.delete("/api/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(notesFfilePath));
  const noteId = req.query.id;
  const newNote = data.filter((note) => note.id != noteId);
  fs.writeFileSync(notesFfilePath, JSON.stringify(newNote, null, 2));
  console.log(noteId, newNote);
  res.status(201).json({ message: "Note deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
