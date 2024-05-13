const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  projectLink: {
    type: String,
  },
  codeLink: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  tags: [
    {
      type: String,
      default: "All",
    },
  ],
  technologiesUsed: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
  },
  highlights: [{ type: String }],
  screenshots: [{ type: String }],
  video: [{ type: String, required: false }],
  details: {
    type: String,
  },

  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Projects", projectSchema);
