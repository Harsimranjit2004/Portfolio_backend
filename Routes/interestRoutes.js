const express = require("express");
const {
  getAllProjects,
  createInterest,
  updateInterest,
  deleteInterest,
} = require("../controllers/interest.controller");
const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(createInterest)
  .patch(updateInterest)
  .delete(deleteInterest);
module.exports = router;
