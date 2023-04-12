const express = require("express");
const router = express();
const { check } = require("express-validator");

const PostCtrl = require("../controllers/PostCtrl");
router.get("/posts", PostCtrl.getAllPosts);
//// THIS RELATED POSTS ARE FOR ADD OR UPDATE A BLOG
router.get("/related-posts", PostCtrl.getRelatedPosts);
router.post(
  "/new-post",
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("relatedPosts", "فرمت بخش مقالات مرتبط اشتباه است!").isArray(),
    check("tags", "فرمت بخش برچسب ها اشتباه است!").isArray(),
  ],
  PostCtrl.newPost
);
router.post(
  "/update-post/:id",
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("relatedPosts", "فرمت بخش مقالات مرتبط اشتباه است!").isArray(),
    check("tags", "فرمت بخش برچسب ها اشتباه است!").isArray(),
  ],
  PostCtrl.updatePost
);
router.post("/remove-post/:id", PostCtrl.removePost);
router.get("/get-post/:slug", PostCtrl.getOnePost);
router.get("/get-post-by-id/:id", PostCtrl.getOnePostById);
router.get("/get-new-posts", PostCtrl.getNewPosts);
router.get("/get-blog-page-posts", PostCtrl.getBlogPagePosts);
router.get("/get-most-popular-posts", PostCtrl.getMostPopularPosts);
//// THIS RELATED POSTS ARE FOR SINGLE BLOG PAGE
router.post("/get-related-posts-by-id", PostCtrl.getRelatedPostsByIds);

module.exports = router;
