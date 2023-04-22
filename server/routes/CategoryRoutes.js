const express = require("express");
const router = express();
const { check } = require("express-validator");

const CategoryCtrl = require("../controllers/CategoryCtrl");
const Category = require("../models/Category");

router.get("/categories", CategoryCtrl.getAllCategories);
//// THESE ARE FOR CREATE NEW CATEGORY
router.post(
  "/new-category",
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("title", "تعداد کاراکتر عنوان باید 5 تا 13 کاراکتر باشد!").isLength({
      min: 5,
      max: 13,
    }),
    check(
      "shortDesc",
      "تعداد کاراکتر توضیحات کوتاه باید 5 تا 32 کاراکتر باشد!"
    ).isLength({
      min: 5,
      max: 32,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Category.find({
        slug: value,
      }).then((category) => {
        if (category.length > 0) {
          throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  CategoryCtrl.newCategory
);
router.post(
  "/update-category/:id",
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("title", "تعداد کاراکتر عنوان باید 5 تا 13 کاراکتر باشد!").isLength({
      min: 5,
      max: 13,
    }),
    check(
      "shortDesc",
      "تعداد کاراکتر توضیحات کوتاه باید 5 تا 32 کاراکتر باشد!"
    ).isLength({
      min: 5,
      max: 32,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Category.find({
        slug: value,
      }).then((category) => {
        if (category.length > 1) {
          throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  CategoryCtrl.updateCategory
);
router.post("/remove-category/:id", CategoryCtrl.removeCategory);
router.get("/get-category/:id", CategoryCtrl.getOneCategoryById);
router.get("/get-active-categories", CategoryCtrl.getMainPageCategories);
router.get("/get-category/:slug", CategoryCtrl.getOneCategoryBySlug);

module.exports = router;
