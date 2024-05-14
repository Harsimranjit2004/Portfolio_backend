const express = require("express");
const {
  getAllNotes,
  createNotes,
  updateNotes,
  deleteNote,
} = require("../controllers/notes.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllNotes)
  .post(createNotes)
  .patch(updateNotes)
  .delete(deleteNote);

module.exports = router;
