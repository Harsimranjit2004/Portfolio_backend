const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  kaggle: {
    type: String,
  },
  github: {
    type: String,
  },
  projects: {
    type: String,
  },
  experience: {
    type: String,
  },
  tags: [{ type: String, default: "All" }],
  HomeAbout: {
    type: String,
  },
  AboutPage: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
