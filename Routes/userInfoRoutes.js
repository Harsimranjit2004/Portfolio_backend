const express = require("express");
const {
  getAllInfo,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
} = require("../controllers/userInfo.controller");
const router = express.Router();

router
  .route("/")
  .get(getAllInfo)
  .post(createUserInfo)
  .patch(updateUserInfo)
  .delete(deleteUserInfo);
module.exports = router;
