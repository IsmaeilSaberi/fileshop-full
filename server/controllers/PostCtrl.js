const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalPosts = await Post.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate);
      const AllPostsNumber = await (await Post.find()).length;
      res.status(200).json({ GoalPosts, AllPostsNumber });
    } else {
      const AllPosts = await Post.find();
      res.status(200).json(AllPosts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error!" });
  }
};
module.exports.getAllPosts = getAllPosts;

const getRelatedPosts = async (req, res) => {
  try {
    const AllPosts = await Post.find().select({ title: 1 });
    res.status(200).json(AllPosts);
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};
module.exports.getRelatedPosts = getRelatedPosts;

const newPost = async (req, res) => {
  try {
    await Post.create(req.body);
    res.status(200).json({ msg: "پست یا مقاله با موفقیت اضافه شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error" });
  }
};
module.exports.newPost = newPost;

const updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "مقاله با موفقیت آپدیت شد!" });
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};
module.exports.updatePost = updatePost;

const removePost = async (req, res) => {
  try {
    await MiddleBanner.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "مقاله با موفقیت حذف شد!" });
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};
module.exports.removePost = removePost;

const getOnePost = async (req, res) => {
  try {
    const targetPost = await Post.findOne({ slug: req.params.slug });

    // ADD ONE TO PAGE VIEW
    const newPost = {
      pageView: targetPost.pageView + 1,
    };
    await Post.findByIdAndUpdate(targetPost._id, newPost, {
      new: true,
    });
    res.status(200).json(targetPost);
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};
module.exports.getOnePost = getOnePost;

const getNewPosts = async (req, res) => {
  try {
    const NewPosts = await Post.find().select({
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
    res.status(400).json("an error accured!");
  }
};
module.exports.getNewPosts = getNewPosts;
