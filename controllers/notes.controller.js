const Notes = require("../models/notes");
const asyncHandler = require("express-async-handler");

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "no notes found" });
  }
  res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, tags, fileUrl, imgUrl } = req.body;
  const note = await Notes.create({
    title,
    tags,
    fileUrl,
    imgUrl,
  });
  if (note) {
    res.status(201).json({ message: "new notes added" });
  } else {
    res.status(400).json({ message: "invalid data " });
  }
});

const updateNotes = asyncHandler(async (req, res) => {
  const { id, title, tags, fileUrl, imgUrl } = req.body;
  const note = await Notes.findById(id);
  if (!note) {
    return res.status(400).json({ message: "notes not exist " });
  }
  note.title = title;
  note.tags = tags;
  note.fileUrl = fileUrl;
  note.imgUrl = imgUrl;

  const updatedInfo = await note.save();
  res.json(`${updatedInfo.title} updated`);
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "id is missing" });
  }
  const note = await Notes.findById(id);
  if (!note) {
    res.status(400).json({ message: "note not found" });
  }
  const result = await note.deleteOne();
  res.json({ message: "notes deleted" });
});
module.exports = { getAllNotes, createNotes, updateNotes, deleteNote };
