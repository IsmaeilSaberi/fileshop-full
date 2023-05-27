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
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
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
            displayname: theUser.displayname,
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
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newComment = newComment;

const publishComment = async (req, res) => {
  try {
    const theUser = await User.find({ email: req.body.email });
    if (!theUser) {
      res.status(401).json({ msg: "کاربر یافت نشد!" });
    } else {
      // LEVEL 1: UPDATING COMMENT WITH published:true
      const newCommentData = {
        published: true,
      };
      await Comment.findByIdAndUpdate(req.body.goalId, newCommentData, {
        new: true,
      });

      // LEVEL 2: EMAIL TO PARENT COMMENT USER
      if (req.body.parentId == "nothing") {
        return res.status(200).json({ msg: "دیدگاه با موفقیت منتشر شد!" });
      } else {
        const theParentComment = await Comment.findById(req.body.parentId);
        if (theParentComment.email == process.env.ADMIN_EMAIL) {
          return res.status(200).json({ msg: "دیدگاه با موفقیت منتشر شد!" });
        } else {
          //SENDING SECURITY EMAIL TO USER ACCOUNT
          const MAIL_HOST = process.env.MAIL_HOST;
          const MAIL_PORT = process.env.MAIL_PORT;
          const MAIL_USER = process.env.MAIL_USER;
          const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
          const MAIL_MAIN_ADDRESS = process.env.MAIL_MAIN_ADDRESS;

          const transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            tls: true,
            auth: {
              user: MAIL_USER,
              pass: MAIL_PASSWORD,
            },
          });
          transporter
            .sendMail({
              from: MAIL_MAIN_ADDRESS,
              to: theParentComment.email,
              subject: "پاسخ جدید برای شما در فروشگاه فایل اسماعیل!",
              html: `<html><head><style>strong{color: rgb(0, 81, 255);}h1{font-size: large;}</style></head><body><h1>پاسخ جدید برای شما در فروشگاه فایل اسماعیل!</h1><div>برای دیدگاه شما پاسخ جدیدی ثبت شده است!</strong></div></body></html>`,
            })
            .then((d) => {
              return res.status(200).json({
                msg: "انتشار دیدگاه و ارسال ایمیل با موفقیت انجام شد!",
              });
            })
            .catch((error) => {
              console.log(error);
              return res.status(400).json({
                msg: "خطا در ارسال ایمیل به کاربر پدر!",
                errorMessage: error,
              });
            });
        }
      }
      res
        .status(200)
        .json({ msg: "دیدگاه شما پس از بررسی و تایید منتشر خواهد شد!" });
    }
  } catch (error) {
    console.log(error);
    // res.status(400).json(error);
  }
};
module.exports.publishComment = publishComment;

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

const getAllNotViewedComments = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalComments = await Comment.find({ viewed: false })
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
      const AllCommentsNumber = await (
        await Comment.find({ viewed: false })
      ).length;
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
module.exports.getAllNotViewedComments = getAllNotViewedComments;

const updateComment = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const data = req.body;
      data.displayname = req.body.displayname
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
    let theSrc = {};
    if (targetComment.typeOfModel == "post") {
      const postSrc = await Post.findById(targetComment.src_id).select({
        title: 1,
        slug: 1,
      });
      theSrc = postSrc;
    } else {
      const productSrc = await Product.findById(targetComment.src_id).select({
        title: 1,
        slug: 1,
      });
      theSrc = productSrc;
    }

    // ADDING PARENT COMMENT
    let theParentComment = {};
    if (targetComment.parentId != "nothing") {
      const thePar = await Comment.findById(targetComment.parentId).select({
        message: 1,
        email: 1,
        displayname: 1,
        createdAt: 1,
      });
      theParentComment = thePar;
    }

    const sendingData = {
      _id: targetComment._id,
      message: targetComment.message,
      email: targetComment.email,
      displayname: targetComment.displayname,
      src_id: targetComment.src_id,
      parentId: targetComment.parentId,
      typeOfModel: targetComment.typeOfModel,
      published: targetComment.published,
      viewed: targetComment.viewed,
      createdAt: targetComment.createdAt,
      src: theSrc,
      parent: theParentComment,
    };

    res.status(200).json(sendingData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneCommentById = getOneCommentById;

const getModelComments = async (req, res) => {
  try {
    const goalModelComments = await Comment.find({
      src_id: req.body._id,
      parentId: "nothing",
      published: true,
    })
      .sort({ _id: -1 })
      .select({
        createdAt: 1,
        _id: 1,
        displayname: 1,
        message: 1,
        parentId: 1,
      });
    res.status(200).json(goalModelComments);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getModelComments = getModelComments;

const getCommentChildren = async (req, res) => {
  try {
    const goalReplyComments = await Comment.find({
      parentId: req.params.id,
      published: true,
    })
      .sort({ _id: -1 })
      .select({
        createdAt: 1,
        _id: 1,
        displayname: 1,
        message: 1,
        parentId: 1,
      });
    res.status(200).json(goalReplyComments);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getCommentChildren = getCommentChildren;
