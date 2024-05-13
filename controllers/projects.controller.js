const Projects = require("../models/Project");
const asyncHandler = require("express-async-handler");

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Projects.find().lean();
  if (!projects?.length) {
    return res.status(400).json({ message: "No projects found" });
  }
  res.json(projects);
});

const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    projectLink,
    codeLink,
    imageUrl,
    tags,
    technologiesUsed,
    status,
    highlights,
    screenshots,
    video,
    details,
    creationDate,
  } = req.body;
  const project = await Projects.create({
    title,
    description,
    projectLink,
    codeLink,
    imageUrl,
    tags,
    technologiesUsed,
    status,
    highlights,
    screenshots,
    video,
    details,
    creationDate,
  });
  if (project) {
    res.status(201).json({ message: `new project added` });
  } else {
    [res.status(400).json({ message: "invalid data" })];
  }
});
const updateProject = asyncHandler(async (req, res) => {
  const {
    id,
    title,
    description,
    projectLink,
    codeLink,
    imageUrl,
    tags,
    technologiesUsed,
    status,
    highlights,
    screenshots,
    video,
    details,
    creationDate,
  } = req.body;

  const project = await Projects.findById(id);
  if (!project) {
    return res.status(400).json({ message: "project not exist" });
  }
  (project.title = title),
    (project.description = description),
    (project.projectLink = projectLink),
    (project.codeLink = codeLink),
    (project.imageUrl = imageUrl),
    (project.tags = tags),
    (project.technologiesUsed = technologiesUsed),
    (project.status = status),
    (project.highlights = highlights),
    (project.screenshots = screenshots),
    (project.video = video),
    (project.details = details),
    (project.creationDate = creationDate);

  const updatedInfo = await project.save();
  res.json(`${updatedInfo.title} updated}`);
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "id is missing" });
  }
  const project = await Projects.findById(id).exec();
  if (!project) {
    res.status(400).json({ message: "project not found" });
  }
  const result = await project.deleteOne();
  res.json({ message: "project deleted" });
});
module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
