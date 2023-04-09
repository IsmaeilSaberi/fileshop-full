const express = require("express");
const router = express();

const PostCtrl = require("../controllers/PostCtrl");
router.get("/posts", PostCtrl.getAllPosts);
router.get("/related-posts", PostCtrl.getRelatedPosts);
router.post("/new-post", PostCtrl.newPost);
router.post("/update-post/:id", PostCtrl.updatePost);
router.post("/remove-post/:id", PostCtrl.removePost);
router.get("/get-post/:slug", PostCtrl.getOnePost);
router.get("/get-post-by-id/:id", PostCtrl.getOnePostById);
router.get("/get-new-posts", PostCtrl.getNewPosts);
router.get("/get-blog-page-posts", PostCtrl.getBlogPagePosts);

module.exports = router;
