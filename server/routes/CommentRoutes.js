const express = require("express");
const router = express();
const { check } = require("express-validator");

const CommentCtrl = require("../controllers/CommentCtrl");
const UserExist = require("../middlewares/userExist");

router.post(
  "/new-comment",
  UserExist,
  [
    check(
      "message",
      "تعداد کاراکتر دیدگاه شما باید بیشتر از 200 کاراکتر باشد!"
    ).isLength({
      min: 200,
    }),
    check("src_id", "آیدی مدل مرجع اشتباه است!").isLength({
      min: 24,
      max: 24,
    }),
    check("parentId", "آیدی مدل مرجع اشتباه است!").isLength({
      min: 24,
      max: 24,
    }),
  ],
  CommentCtrl.newComment
);

router.get("/comments", PaymentCtrl.getAllComments);

router.post(
  "/update-comment/:id",
  [
    check(
      "message",
      "تعداد کاراکتر دیدگاه شما باید بیشتر از 200 کاراکتر باشد!"
    ).isLength({
      min: 200,
    }),
    check("src_id", "آیدی مدل مرجع اشتباه است!").isLength({
      min: 24,
      max: 24,
    }),
    check("parentId", "آیدی مدل مرجع اشتباه است!").isLength({
      min: 24,
      max: 24,
    }),
  ],
  CommentCtrl.updateComment
);

router.post("/remove-comment/:id", CommentCtrl.removeComment);

// FOR ADMIN
router.get("/get-comment/:id", CommentCtrl.getOneCommentById);

module.exports = router;
