const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  console.log(title, content, category);
  if (!title && !content && !category) {
    res.status(401);
    throw new Error("Please Fill All The Details");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
});
const updateNotes = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, content, category } = req.body;
  const note = await Note.findById(id);
  if (note.user.toString() !== req.user._id.toString()) {
    throw new Error("You do not have Authorize to perform action");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});
const deleteNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  if (note.user.toString() !== req.user._id.toString()) {
    throw new Error("You do not have Authorize to perform action");
  }
  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  }
});
module.exports = {
  getNotes,
  createNotes,
  getNoteById,
  updateNotes,
  deleteNote,
};
