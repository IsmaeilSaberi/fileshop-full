const Category = require("../models/Category");
const { validationResult } = require("express-validator");
const Product = require("../models/Product");

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
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        await Category.create(data);
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
        //// find category and update it in products categories list
        const theCategory = await Category.findById(req.params.id).select({
          title: 1,
          slug: 1,
        });
        const allProducts = await Product.find().select({ categories: 1 });
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();

        for (let i = 0; i < allProducts.length; i++) {
          for (let j = 0; j < allProducts[i].categories.length; j++) {
            if (allProducts[i].categories[j]._id == theCategory.id) {
              let updatedProductCategories = allProducts[i].categories;
              if (j > -1) {
                updatedProductCategories.splice(j, 1);
              }
              updatedProductCategories = [
                ...updatedProductCategories,
                {
                  _id: req.params.id,
                  title: req.body.title,
                  slug: data.slug,
                },
              ];
              const updatedProduct = { categories: updatedProductCategories };
              await Product.findByIdAndUpdate(
                allProducts[i]._id,
                updatedProduct,
                {
                  new: true,
                }
              );
            }
          }
        }

        await Category.findByIdAndUpdate(req.params.id, data, {
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
    //// find category and remove it from products categories list
    const theCategory = await Category.findById(req.params.id).select({
      title: 1,
      slug: 1,
    });
    const allProducts = await Product.find().select({ categories: 1 });

    for (let i = 0; i < allProducts.length; i++) {
      for (let j = 0; j < allProducts[i].categories.length; j++) {
        if (allProducts[i].categories[j]._id == theCategory.id) {
          let updatedProductCategories = allProducts[i].categories;
          if (j > -1) {
            updatedProductCategories.splice(j, 1);
          }
          const updatedProduct = { categories: updatedProductCategories };
          await Product.findByIdAndUpdate(allProducts[i]._id, updatedProduct, {
            new: true,
          });
        }
      }
    }
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
