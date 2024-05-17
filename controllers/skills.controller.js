const Skills = require("../models/Skills");
const asyncHandler = require("express-async-handler");

const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await Skills.find().lean();
  if (!skills?.length) {
    return res.status(400).json({ message: "No skills found" });
  }
  res.json(skills);
});
const createSkills = asyncHandler(async (req, res) => {
  const { text, value, icon } = req.body;
  const skill = await Skills.create({
    text,
    value,
    icon,
  });
  if (skill) {
    res.status(201).json({ message: "new skills added" });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

const updateSkill = asyncHandler(async (req, res) => {
  const { id, text, value, icon } = req.body;
  const skill = await Skills.findById(id);
  if (!skill) {
    return res.status(400).json({ message: "skill not exist" });
  }
  skill.text = text;
  skill.value = value;
  skill.icon = icon;

  const updatedInfo = await skill.save();
  res.json(`${updatedInfo.text} updated`);
});
const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "id is missing" });
  }
  const skill = await Skills.findById(id).exec();
  if (!skill) {
    res.status(400).json({ message: "project not found" });
  }
  const result = await skill.deleteOne();
  res.json({ message: "skill deleted" });
});

module.exports = {
  getAllSkills,
  createSkills,
  updateSkill,
  deleteSkill,
};
