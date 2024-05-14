const express = require("express");
const {
  getAllNotebooks,
  createNotebooks,
  updateNotebooks,
  deleteNotebook,
} = require("../controllers/notebooks.controller");
const router = express.Router();

router
  .route("/")
  .get(getAllNotebooks)
  .post(createNotebooks)
  .patch(updateNotebooks)
  .delete(deleteNotebook);
module.exports = router;
