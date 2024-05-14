const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  fileUrl: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
});
module.exports = mongoose.model("Notes", notesSchema);
