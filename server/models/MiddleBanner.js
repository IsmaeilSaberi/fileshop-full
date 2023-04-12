const mongoose = require("mongoose");
const MiddleBannerSchema = new mongoose.Schema({
  image: {
    required: true,
    type: String,
  },
  imageAlt: {
    required: true,
    type: String,
  },
  situation: {
    required: true,
    type: Boolean,
  },
  link: {
    required: true,
    type: String,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
});

module.exports = mongoose.model("MiddleBanner", MiddleBannerSchema);
