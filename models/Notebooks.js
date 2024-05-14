const mongoose = require("mongoose");

const notebooksSchema = new mongoose.Schema({
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
module.exports = mongoose.model("Notebooks", notebooksSchema);
