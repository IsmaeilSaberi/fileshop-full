const mongoose = require("mongoose");
const Post = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  updatedAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  slug: {
    required: true,
    type: String,
    unique: true,
  },
  image: {
    required: true,
    type: String,
  },
  imageAlt: {
    required: true,
    type: String,
  },
  shortDesc: {
    required: true,
    type: String,
  },
  longDesc: {
    required: true,
    type: String,
  },
  tags: {
    required: true,
    type: Array,
    default: [],
  },
  relatedPosts: {
    required: true,
    type: Array,
    default: [],
  },
  comments: {
    required: true,
    type: Array,
    default: [],
  },
  type: {
    required: true,
    type: String,
    default: "post",
  },
  pageView: {
    required: true,
    type: Number,
    default: 0,
  },
  published: {
    required: true,
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Post", Post);
