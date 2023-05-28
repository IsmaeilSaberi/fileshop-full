const express = require("express");
const router = express();
const { check } = require("express-validator");

const isAdmin = require("../middlewares/isAdmin");
const userExist = require("../middlewares/userExist");

const CommentCtrl = require("../controllers/CommentCtrl");

router.post(
  "/new-comment",
  userExist,
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
  ],
  CommentCtrl.newComment
);

router.get("/comments", isAdmin, CommentCtrl.getAllComments);

router.get("/not-viwed-comments", isAdmin, CommentCtrl.getAllNotViewedComments);

router.post(
  "/update-comment/:id",
  isAdmin,
  [
    check(
      "message",
      "تعداد کاراکتر دیدگاه شما باید بیشتر از 100 کاراکتر باشد!"
    ).isLength({
      min: 100,
    }),
  ],
  CommentCtrl.updateComment
);

router.post("/remove-comment/:id", isAdmin, CommentCtrl.removeComment);

// FOR ADMIN
router.get("/get-comment/:id", isAdmin, CommentCtrl.getOneCommentById);

router.post("/get-model-comments", CommentCtrl.getModelComments);

router.get("/get-comment-children/:id", CommentCtrl.getCommentChildren);

router.post("/publish-comment", isAdmin, CommentCtrl.publishComment);

router.get(
  "/get-model-comments-number/:id",
  CommentCtrl.getModelCommentsNumber
);

module.exports = router;
