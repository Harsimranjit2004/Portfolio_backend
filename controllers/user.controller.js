const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No User Found" });
  }
  res.json(users);
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(400).json({ message: "duplicate username" });
  }
  const hashpwd = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashpwd, roles };
  const user = await User.create(userObject);
  if (user) {
    res.status(201).json({ message: `new user created ${username}` });
  } else {
    res.status(400).json({ message: "Invalid user data recieved" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password } = req.body;

  // Check for required fields
  if (!id || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find user by ID
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(400).json({ message: "Duplicate username" });
  }

  // Update user details
  user.username = username;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // Save updated user
  const updatedUser = await user.save();
  return res.json({ message: `Updated ${updatedUser.username}` });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "userId required" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: "user not found" });
  }
  const result = await user.deleteOne();
  const reply = `user name ${result.username} with id ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
