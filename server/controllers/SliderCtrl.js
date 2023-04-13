const Slider = require("../models/Slider");
const { validationResult } = require("express-validator");

const getAllSliders = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalSliders = await Slider.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          image: 1,
          imageAlt: 1,
          sorter: 1,
          date: 1,
          situation: 1,
        });
      const AllSlidersNumber = await (await Slider.find()).length;
      res.status(200).json({ GoalSliders, AllSlidersNumber });
    } else {
      const AllSliders = await Slider.find().sort({ _id: -1 });
      res.status(200).json(AllSliders);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllSliders = getAllSliders;

const newSlider = async (req, res) => {
  ////// new simple method for create a slider
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
        await Slider.create(req.body);
        res.status(200).json({ msg: "اسلایدر با موفقیت اضافه شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newSlider = newSlider;

const updateSlider = async (req, res) => {
  ////// a simple method for update a slider
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
        await Slider.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json({ msg: "اسلایدر با موفقیت آپدیت شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.updateSlider = updateSlider;

const removeSlider = async (req, res) => {
  ////// a simple method for remove a slider
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "اسلایدر با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.removeSlider = removeSlider;

const getOneSlider = async (req, res) => {
  try {
    const goalId = req.params.id;
    const targetSlider = await Slider.findById(goalId);
    res.status(200).json(targetSlider);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.getOneSlider = getOneSlider;

const getActiveSliders = async (req, res) => {
  try {
    const ActiveSliders = await Slider.find({ situation: true })
      .sort({ sorter: 1 })
      .select({
        image: 1,
        imageAlt: 1,
        link: 1,
        sorter: 1,
      });
    res.status(200).json(ActiveSliders);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.getActiveSliders = getActiveSliders;
