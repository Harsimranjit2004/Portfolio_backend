const express = require("express");
const {
  getAllEduations,
  createEducations,
  updateEducation,
  deleteEducation,
} = require("../controllers/education.controller");
const router = express.Router();

router
  .route("/")
  .get(getAllEduations)
  .post(createEducations)
  .patch(updateEducation)
  .delete(deleteEducation);
module.exports = router;
