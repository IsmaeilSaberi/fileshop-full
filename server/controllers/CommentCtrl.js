const User = require("../models/User");
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");
const axios = require("axios");
const qs = require("qs");
const nodemailer = require("nodemailer");

const newComment = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (!theUser) {
      res.status(401).json({ msg: "کاربر یافت نشد!" });
    } else {
      if (theUser.userIsActive == false) {
        res.status(401).json({ msg: "لطفا ایمیل خود را تایید کنید!" });
      } else {
        const commentData = {
          message: req.body.message,
          email: theUser.email,
          displayName: theUser.displayName,
          src_id: req.body.src_id,
          parentId: req.body.parentId,
          typeOfModel: req.body.typeOfModel,
          published: false,
          viewed: false,
          createdAt: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        await Comment.create(commentData);
        res
          .status(200)
          .json({ msg: "دیدگاه شما پس از بررسی و تایید منتشر خواهد شد!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newComment = newComment;

const getAllComments = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalComments = await Comment.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          email: 1,
          amount: 1,
          parentId: 1,
          viewed: 1,
          published: 1,
          createdAt: 1,
        });
      const AllCommentsNumber = await (await Comment.find()).length;
      res.status(200).json({ GoalComments, AllCommentsNumber });
    } else {
      const AllComments = await Comment.find().sort({ _id: -1 });
      res.status(200).json(AllComments);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllComments = getAllComments;

const updateComment = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const data = req.body;
      data.displayName = req.body.displayName
        .replace(/\s+/g, "_")
        .toLowerCase();
      data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
      await Comment.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      res.status(200).json({ msg: "دیدگاه با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateComment = updateComment;

const removeComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "دیدگاه با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeComment = removeComment;

const getOneCommentById = async (req, res) => {
  try {
    const targetComment = await Comment.findById(req.params.id);

    // ADDING SOURCE POST OR PRODUCT TO COMMENT
    targetComment.src = {};
    if (targetComment.typeOfModel == "post") {
      targetComment.src = await Post.findById(targetComment.src_id).select({
        title: 1,
        slug: 1,
      });
    } else {
      targetComment.src = await Product.findById(targetComment.src_id).select({
        title: 1,
        slug: 1,
      });
    }

    // ADDING PARENT COMMENT
    targetComment.parent = {};
    if (targetComment.parentId == null) {
      targetComment.parent = {};
    } else {
      targetComment.parent = await Comment.findById(
        targetComment.parentId
      ).select({
        message: 1,
        email: 1,
        displayName: 1,
        createdAt: 1,
      });
    }
    res.status(200).json(targetComment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneCommentById = getOneCommentById;
