const mongoose = require("mongoose");

const educationSchema = mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  isEducation: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  paragraph: {
    type: String,
  },
  listItem: [{ type: String }],
});
module.exports = mongoose.model("Education", educationSchema);
