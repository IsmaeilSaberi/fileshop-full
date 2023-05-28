const express = require("express");
const router = express();
const { check } = require("express-validator");
const Post = require("../models/Post");

const isAdmin = require("../middlewares/isAdmin");

const PostCtrl = require("../controllers/PostCtrl");

router.get("/posts", isAdmin, PostCtrl.getAllPosts);
//// THIS RELATED POSTS ARE FOR ADD OR UPDATE A BLOG
router.get("/related-posts", PostCtrl.getRelatedPosts);
router.post(
  "/new-post",
  isAdmin,
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("relatedPosts", "فرمت بخش مقالات مرتبط اشتباه است!").isArray(),
    check("tags", "فرمت بخش برچسب ها اشتباه است!").isArray(),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Post.find({
        slug: value,
      }).then((post) => {
        if (post.length > 0) {
          throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  PostCtrl.newPost
);
router.post(
  "/update-post/:id",
  isAdmin,
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("relatedPosts", "فرمت بخش مقالات مرتبط اشتباه است!").isArray(),
    check("tags", "فرمت بخش برچسب ها اشتباه است!").isArray(),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Post.find({
        slug: value,
      }).then((post) => {
        if (post.length > 1) {
          throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  PostCtrl.updatePost
);
router.post("/remove-post/:id", isAdmin, PostCtrl.removePost);
router.get("/get-post/:slug", PostCtrl.getOnePost);
router.get("/get-post-by-id/:id", isAdmin, PostCtrl.getOnePostById);
router.get("/get-new-posts", PostCtrl.getNewPosts);
router.get("/get-most-popular-posts", PostCtrl.getMostPopularPosts);
//// THIS RELATED POSTS ARE FOR SINGLE BLOG PAGE
router.post("/get-related-posts-by-id", PostCtrl.getRelatedPostsByIds);
router.get("/search-posts", PostCtrl.searchPosts);

module.exports = router;
