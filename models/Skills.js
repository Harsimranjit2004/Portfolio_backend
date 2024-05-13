const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model("Skills", skillsSchema);
