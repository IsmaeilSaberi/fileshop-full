const Post = require("../models/Post");
const { validationResult } = require("express-validator");

const getAllPosts = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalPosts = await Post.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          updatedAt: 1,
          image: 1,
          imageAlt: 1,
          published: 1,
          pageView: 1,
        });
      const AllPostsNumber = await (await Post.find()).length;
      res.status(200).json({ GoalPosts, AllPostsNumber });
    } else {
      const AllPosts = await Post.find().sort({ _id: -1 });
      res.status(200).json(AllPosts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllPosts = getAllPosts;

// THIS RELATED POSTS ARE FOR ADD OR UPDATE A BLOG
const getRelatedPosts = async (req, res) => {
  try {
    const AllPosts = await Post.find({ published: true }).select({ title: 1 });
    res.status(200).json(AllPosts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getRelatedPosts = getRelatedPosts;

const newPost = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.image.endsWith(".png") ||
        req.body.image.endsWith(".jpg") ||
        req.body.image.endsWith(".jpeg") ||
        req.body.image.endsWith(".webp")
      ) {
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        await Post.create(data);
        res.status(200).json({ msg: "پست یا مقاله با موفقیت اضافه شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newPost = newPost;

const updatePost = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.image.endsWith(".png") ||
        req.body.image.endsWith(".jpg") ||
        req.body.image.endsWith(".jpeg") ||
        req.body.image.endsWith(".webp")
      ) {
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        await Post.findByIdAndUpdate(req.params.id, data, {
          new: true,
        });
        res.status(200).json({ msg: "مقاله با موفقیت آپدیت شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updatePost = updatePost;

const removePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "مقاله با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removePost = removePost;

const getOnePost = async (req, res) => {
  try {
    const targetPost = await Post.findOne({ slug: req.params.slug });
    if (targetPost.published == true) {
      // ADD ONE TO PAGE VIEW
      const newPost = {
        pageView: targetPost.pageView + 1,
      };
      await Post.findByIdAndUpdate(targetPost._id, newPost, {
        new: true,
      });
      res.status(200).json(targetPost);
    } else {
      res.status(400).json({ msg: "مقاله هنوز منتشر نشده است!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOnePost = getOnePost;

const getOnePostById = async (req, res) => {
  try {
    const targetPost = await Post.findById(req.params.id);
    res.status(200).json(targetPost);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOnePostById = getOnePostById;

const getNewPosts = async (req, res) => {
  try {
    const NewPosts = await Post.find({ published: true })
      .sort({ _id: -1 })
      .limit(4)
      .select({
        title: 1,
        updatedAt: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        shortDesc: 1,
        type: 1,
        pageView: 1,
      });
    res.status(200).json(NewPosts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getNewPosts = getNewPosts;

const getBlogPagePosts = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalPosts = await Post.find({ published: true })
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          updatedAt: 1,
          slug: 1,
          image: 1,
          imageAlt: 1,
          shortDesc: 1,
          type: 1,
          pageView: 1,
        });
      const AllPostsNumber = await (
        await Post.find({ published: true })
      ).length;
      res.status(200).json({ GoalPosts, AllPostsNumber });
    } else {
      const AllPosts = await Post.find().sort({ _id: -1 });
      res.status(200).json(AllPosts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getBlogPagePosts = getBlogPagePosts;

const getMostPopularPosts = async (req, res) => {
  try {
    const GoalPosts = await Post.find({ published: true })
      .sort({ pageView: -1 })
      .limit(3)
      .select({
        title: 1,
        slug: 1,
      });
    res.status(200).json(GoalPosts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getMostPopularPosts = getMostPopularPosts;

// THIS RELATED POSTS ARE FOR SINGLE BLOG PAGE
const getRelatedPostsByIds = async (req, res) => {
  try {
    const goalIds = req.body.goalIds;
    const GoalPosts = await Post.find({ _id: goalIds }).select({
      title: 1,
      updatedAt: 1,
      slug: 1,
      image: 1,
      imageAlt: 1,
      shortDesc: 1,
      pageView: 1,
    });
    res.status(200).json(GoalPosts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getRelatedPostsByIds = getRelatedPostsByIds;
