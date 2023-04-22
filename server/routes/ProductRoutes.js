const express = require("express");
const router = express();
const { check } = require("express-validator");

const Product = require("../models/Product");
const ProductCtrl = require("../controllers/ProductCtrl");

router.get("/products", ProductCtrl.getAllProducts);
//// THIS RELATED PRODUCTS ARE FOR ADD OR UPDATE A PRODUCT
router.get("/related-products", ProductCtrl.getRelatedProducts);
router.get("/product-categories", ProductCtrl.getRelatedCategoriesOfProducts);
router.post(
  "/new-product",
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("relatedProducts", "فرمت بخش محصولات مرتبط اشتباه است!").isArray(),
    check("typeOfProduct", "تعداد کاراکتر بخش تایپ محصول اشتباه است!").isLength(
      { min: 2, max: 4 }
    ),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Product.find({
        slug: value,
      }).then((product) => {
        if (product.length > 0) {
          throw "لطفا اسلاگ دیگری را انتخاب کنید!";
        }
      });
    }),
  ],
  ProductCtrl.newProduct
);
router.post(
  "/update-product/:id",
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("relatedProducts", "فرمت بخش محصولات مرتبط اشتباه است!").isArray(),
    check("typeOfProduct", "تعداد کاراکتر بخش تایپ محصول اشتباه است!").isLength(
      { min: 2, max: 4 }
    ),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Product.find({
        slug: value,
      }).then((product) => {
        if (product.length > 1) {
          throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  ProductCtrl.updateProduct
);
router.post("/remove-product/:id", ProductCtrl.removeProduct);
router.get("/get-product/:slug", ProductCtrl.getOneProduct);
router.get("/get-product-by-id/:id", ProductCtrl.getOneProductById);
router.get("/get-new-products", ProductCtrl.getNewProducts);
router.get("/get-most-popular-products", ProductCtrl.getMostPopularProducts);
//// THIS RELATED PRODUCTS ARE FOR SINGLE PRODUCT PAGE
router.post("/get-related-products-by-id", ProductCtrl.getRelatedProductsByIds);
////THIS IS USING FOR GETTING EVERY TYPE PRODUCTS IN ALLPRODUCTS COMPONENT
router.get(
  "/get-products-of-type/:typeOfProduct",
  ProductCtrl.getOneTypeProducts
);

module.exports = router;
