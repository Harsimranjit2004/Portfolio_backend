const Education = require("../models/Education");
const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");

const getAllEduations = asyncHandler(async (req, res) => {
  const educations = await Education.find().lean();
  if (!educations?.length) {
    return res.status(400).json({ message: "no Education found" });
  }
  res.json(educations);
});

const createEducations = asyncHandler(async (req, res) => {
  const { title, date, isEducation, organizationName, paragraph, listItem } =
    req.body;
  const education = await Education.create({
    title,
    date,
    isEducation,
    organizationName,
    paragraph,
    listItem,
  });
  if (education) {
    res.status(201).json({ message: "new education added" });
  } else {
    res.status(400).json({ message: "invalid data" });
  }
});
const updateEducation = asyncHandler(async (req, res) => {
  const {
    id,
    title,
    date,
    isEducation,
    organizationName,
    paragraph,
    listItem,
  } = req.body;
  const education = await Education.findById(id);
  if (!education) {
    return res.status(400).json({ message: "education not found" });
  }
  education.title = title;
  education.isEducation = isEducation;
  education.date = date;
  education.organizationName = organizationName;
  education.listItem = listItem;
  education.paragraph = paragraph;
  const updatedInfo = await education.save();
  res.json(`${updatedInfo.title} updated`);
});

const deleteEducation = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "id is missing" });
  }
  const education = await Education.findById(id).exec();
  if (!education) {
    res.status(400).json({ message: "education not found" });
  }
  const result = await education.deleteOne();
  res.json({ message: "education deleted" });
});

module.exports = {
  getAllEduations,
  createEducations,
  updateEducation,
  deleteEducation,
};
