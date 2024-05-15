const Blogs = require("../models/Blogs");
const asyncHandler = require("express-async-handler");

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blogs.find().lean();
  if (!blogs?.length) {
    return res.status(400).json({ message: "No blogs found" });
  }
  res.json(blogs);
});

const createBlogs = asyncHandler(async (req, res) => {
  const { title, author, imgUrl, description, tags, content, createdAt } =
    req.body;
  const blog = await Blogs.create({
    title,
    author,
    imgUrl,
    description,
    tags,
    content,
    createdAt,
  });
  if (blog) {
    res.status(201).json({ message: "new blog added" });
  } else {
    res.status(400).json({ message: "invalid data" });
  }
});
const updateBlog = asyncHandler(async (req, res) => {
  const { id, title, author, imgUrl, description, tags, content, createdAt } =
    req.body;
  const blog = await Blogs.findById(id);
  if (!blog) {
    return res.status(400).json({ message: "blog not exist" });
  }
  blog.title = title;
  blog.author = author;
  blog.imgUrl = imgUrl;
  blog.description = description;
  blog.tags = tags;
  blog.content = content;
  blog.createdAt = createdAt;

  const updatedInfo = await blog.save();
  res.json(`${updatedInfo.title} update`);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "id is missing" });
  }
  const blog = await Blogs.findById(id);
  if (!blog) {
    res.status(400).json({ message: "blog not exist" });
  }
  const result = await blog.deleteOne();
  res.json({ message: "blog deleted" });
});

module.exports = {
  getAllBlogs,
  createBlogs,
  updateBlog,
  deleteBlog,
};
