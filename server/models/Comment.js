const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  message: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  displayname: {
    required: true,
    type: String,
  },
  src_id: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
  parentId: {
    required: true,
    type: String,
    default: "nothing",
  },
  typeOfModel: {
    required: true,
    type: String,
    enum: ["post", "product"],
  },
  published: {
    required: true,
    type: Boolean,
    default: false,
  },
  viewed: {
    required: true,
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
