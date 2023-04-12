const mongoose = require("mongoose");
const SliderSchema = new mongoose.Schema({
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
  sorter: {
    required: true,
    type: Number,
    default: 1,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
});

module.exports = mongoose.model("Slider", SliderSchema);
