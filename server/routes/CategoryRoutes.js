const express = require("express");
const router = express();
const { check } = require("express-validator");

const CategoryCtrl = require("../controllers/CategoryCtrl");

router.get("/categories", CategoryCtrl.getAllCategories);
//// THESE ARE FOR CREATE NEW CATEGORY
router.post(
  "/new-category",
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("title", "تعداد کاراکتر عنوان باید 5 تا 24 کاراکتر باشد!").isLength({
      min: 5,
      max: 24,
    }),
    check(
      "shortDesc",
      "تعداد کاراکتر توضیحات کوتاه باید 5 تا 40 کاراکتر باشد!"
    ).isLength({
      min: 5,
      max: 40,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
  ],
  CategoryCtrl.newCategory
);
router.post(
  "/update-category/:id",
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("title", "تعداد کاراکتر عنوان باید 5 تا 24 کاراکتر باشد!").isLength({
      min: 5,
      max: 24,
    }),
    check(
      "shortDesc",
      "تعداد کاراکتر توضیحات کوتاه باید 5 تا 40 کاراکتر باشد!"
    ).isLength({
      min: 5,
      max: 40,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
  ],
  CategoryCtrl.updateCategory
);
router.post("/remove-category/:id", CategoryCtrl.removeCategory);
router.get("/get-category/:id", CategoryCtrl.getOneCategoryById);
router.get("/get-active-categories", CategoryCtrl.getMainPageCategories);
router.get("/get-category/:slug", CategoryCtrl.getOneCategoryBySlug);

module.exports = router;
