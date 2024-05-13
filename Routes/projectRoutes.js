const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");
const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(createProject)
  .patch(updateProject)
  .delete(deleteProject);

module.exports = router;
