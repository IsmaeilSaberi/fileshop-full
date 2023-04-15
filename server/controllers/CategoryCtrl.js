const Category = require("../models/Category");
const { validationResult } = require("express-validator");

const getAllCategories = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalCategories = await Category.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          image: 1,
          imageAlt: 1,
          title: 1,
          typeOfProduct: 1,
          situation: 1,
        });
      const AllCategoriesNumber = await (await Category.find()).length;
      res.status(200).json({ GoalCategories, AllCategoriesNumber });
    } else {
      const AllCategories = await Category.find().sort({ _id: -1 });
      res.status(200).json(AllCategories);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllCategories = getAllCategories;

const newCategory = async (req, res) => {
  ////// new simple method for create a middle banner
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
        await Category.create(req.body);
        res.status(200).json({ msg: "دسته بندی محصول با موفقیت اضافه شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newCategory = newCategory;

const updateCategory = async (req, res) => {
  ////// a simple method for update a middle banner
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
        await Category.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json({ msg: "دسته بندی محصول با موفقیت آپدیت شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.updateCategory = updateCategory;

const removeCategory = async (req, res) => {
  ////// a simple method for remove a middle banner
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "دسته بندی محصول با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeCategory = removeCategory;

const getOneCategoryById = async (req, res) => {
  try {
    const goalId = req.params.id;
    const targetCategory = await Category.findById(goalId);
    res.status(200).json(targetCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneCategoryById = getOneCategoryById;

const getMainPageCategories = async (req, res) => {
  try {
    const MainPageCategories = await Category.find({ situation: true }).select({
      image: 1,
      imageAlt: 1,
      slug: 1,
      title: 1,
      typeOfProduct: 1,
      shortDesc: 1,
    });
    res.status(200).json(MainPageCategories);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getMainPageCategories = getMainPageCategories;

const getOneCategoryBySlug = async (req, res) => {
  try {
    const targetCategory = await Category.findOne({ slug: req.params.slug });
    if (targetCategory.situation == true) {
      res.status(200).json(targetPost);
    } else {
      res.status(400).json({ msg: "دسته هنوز منتشر نشده است!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneCategoryBySlug = getOneCategoryBySlug;
