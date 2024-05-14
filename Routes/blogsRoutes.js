const express = require("express");
const {
  getAllBlogs,
  createBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllBlogs)
  .post(createBlogs)
  .patch(updateBlog)
  .delete(deleteBlog);

module.exports = router;
