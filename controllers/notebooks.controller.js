const Notebooks = require("../models/Notebooks");
const asyncHandler = require("express-async-handler");

const getAllNotebooks = asyncHandler(async (req, res) => {
  const notebooks = await Notebooks.find().lean();
  if (!notebooks?.length) {
    return res.status(400).json({ message: "no notebooks find" });
  }
  res.json(notebooks);
});

const createNotebooks = asyncHandler(async (req, res) => {
  const { title, tags, fileUrl, imgUrl } = req.body;
  const notebook = await Notebooks.create({ title, tags, fileUrl, imgUrl });
  if (notebook) {
    res.status(201).json({ message: "new notebook added" });
  } else {
    res.status(400).json({ message: "invalid fields" });
  }
});

const updateNotebooks = asyncHandler(async (req, res) => {
  const { id, title, tags, fileUrl, imgUrl } = req.body;
  const notebook = await Notebooks.findById(id);
  if (!notebook) {
    res.status(400).json({ message: "notebook not exist" });
  }
  notebook.title = title;
  notebook.tags = tags;
  notebook.fileUrl = fileUrl;
  notebook.imgUrl = imgUrl;

  const updatedInfo = await notebook.save();
  res.json(`${updatedInfo.title} updated`);
});

const deleteNotebook = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "id is missing " });
  }
  const notebook = await Notebooks.findById(id);
  if (!notebook) {
    res.status(400).json({ message: "notebook not exist" });
  }
  const result = await notebook.deleteOne();
  res.json({ message: "notebook deleted" });
});
module.exports = {
  getAllNotebooks,
  createNotebooks,
  updateNotebooks,
  deleteNotebook,
};
