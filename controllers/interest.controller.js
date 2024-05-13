const Interest = require("../models/Interest");
const asyncHandler = require("express-async-handler");

const getAllProjects = asyncHandler(async (req, res) => {
  const interest = await Interest.find().lean();
  if (!interest?.length) {
    return res.status(400).json({ message: "No Interest found" });
  }
  res.json(interest);
});

const createInterest = asyncHandler(async (req, res) => {
  const { title, description, img } = req.body;
  const interest = await Interest.create({
    title,
    description,
    img,
  });
  if (interest) {
    res.status(201).json({ message: "new interest added" });
  } else {
    res.status(400).json({ message: "invalid data" });
  }
});
const updateInterest = asyncHandler(async (req, res) => {
  const { id, title, description, img } = req.body;
  const interest = await Interest.findById(id);
  if (!interest) {
    return res.status(400).json({ message: "interest not exist" });
  }
  interest.title = title;
  interest.description = description;
  interest.img = img;

  const updateInfo = await interest.save();
  res.json(`${updateInfo.title} updated`);
});
const deleteInterest = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "id is missing" });
  }
  const interest = await Interest.findById(id).exec();
  if (!interest) {
    res.status(400).json({ message: "project not found" });
  }
  const result = await interest.deleteOne();
  res.json({ message: "interest deleted" });
});

module.exports = {
  getAllProjects,
  createInterest,
  updateInterest,
  deleteInterest,
};
