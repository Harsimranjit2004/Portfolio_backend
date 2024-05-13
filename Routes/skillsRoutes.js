const express = require("express");
const {
  getAllSkills,
  createSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skills.controller");
const router = express.Router();

router
  .route("/")
  .get(getAllSkills)
  .post(createSkills)
  .patch(updateSkill)
  .delete(deleteSkill);
module.exports = router;
