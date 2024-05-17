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
  const userInfo = await UserInfo.create({
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
    linkedin,
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
    resume,
  } = req.body;
  const userInfo = await UserInfo.findById(id);
  (userInfo.email = email),
    (userInfo.phone = phone),
    (userInfo.linkedin = linkedin),
    (userInfo.twitter = twitter),
    (userInfo.kaggle = kaggle),
    (userInfo.github = github),
    (userInfo.projects = projects),
    (userInfo.experience = experience),
    (userInfo.tags = tags),
    (userInfo.HomeAbout = HomeAbout),
    (userInfo.AboutPage = AboutPage),
    (userInfo.image1 = image1),
    (userInfo.image2 = image2);
  userInfo.resume = resume;
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
