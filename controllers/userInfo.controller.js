const UserInfo = require("../models/UserInfo");
const asyncHandler = require("express-async-handler");

const getAllInfo = asyncHandler(async (req, res) => {
  const info = await UserInfo.find().lean();
  if (!info?.length) {
    return res.status(400).json({ message: "No userInfo found" });
  }
  res.status(200).json(info);
});
const createUserInfo = asyncHandler(async (req, res) => {
  const userInfo = await userInfo.create({
    ...req.body,
  });
  if (userInfo) {
    res.status(201).json({ message: "user info created" });
  } else {
    res.status(400).json({ message: "invalid not found" });
  }
});
const updateUserInfo = asyncHandler(async (req, res) => {
  const {
    id,
    email,
    phone,
    linkdin,
    twitter,
    kaggle,
    github,
    projects,
    experience,
    tags,
    HomeAbout,
    AboutPage,
    image1,
    image2,
  } = req.body;
  const userInfo = await UserInfo.findById(id);
  (userInfo.email = email),
    (user.phone = phone),
    (user.linkdin = linkdin),
    (user.twitter = twitter),
    (user.kaggle = kaggle),
    (user.github = github),
    (user.projects = projects),
    (user.experience = experience),
    (user.tags = tags),
    (user.HomeAbout = HomeAbout),
    (user.AboutPage = AboutPage),
    (user.image1 = image1),
    (user.image2 = image2);
  const updatedInfo = await userInfo.save();
  res.json({ message: "updated the userInfo" });
});
const deleteUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "id not found" });
  }
  const userInfo = await UserInfo.findById(id).exec();
  if (!userInfo) {
    res.status(400).json({ message: "id not found" });
  }
  const result = await userInfo.deleteOne();
  res.json({ message: "userInfo deleted" });
});
module.exports = { getAllInfo, createUserInfo, updateUserInfo, deleteUserInfo };
