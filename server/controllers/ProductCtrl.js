const Product = require("../models/Product");
const Category = require("../models/Category");
const { validationResult } = require("express-validator");

const getAllProducts = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalProducts = await Product.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          updatedAt: 1,
          image: 1,
          imageAlt: 1,
          published: 1,
          pageView: 1,
          price: 1,
          typeOfProduct: 1,
          buyNumber: 1,
        });
      const AllProductsNumber = await (await Product.find()).length;
      res.status(200).json({ GoalProducts, AllProductsNumber });
    } else {
      const AllProducts = await Product.find()
        .sort({ _id: -1 })
        .select({ mainFile: false });
      res.status(200).json(AllProducts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllProducts = getAllProducts;

// THese RELATED ProductS ARE FOR ADD OR UPDATE A product
const getRelatedProducts = async (req, res) => {
  try {
    const AllProducts = await Product.find({ published: true }).select({
      title: 1,
    });
    res.status(200).json(AllProducts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getRelatedProducts = getRelatedProducts;

// THese RELATED categories ARE FOR ADD OR UPDATE A product
const getRelatedCategoriesOfProducts = async (req, res) => {
  try {
    const AllCategories = await Category.find({ situation: true }).select({
      title: 1,
      slug: 1,
    });
    res.status(200).json(AllCategories);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getRelatedCategoriesOfProducts = getRelatedCategoriesOfProducts;

const newProduct = async (req, res) => {
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
        const theFeatures = req.body.features;
        const featuresError = theFeatures.filter((fe) => !fe.includes(":"));
        if (featuresError.length > 0) {
          res.status(422).json({ msg: "الگوی بخش ویژگی ها رعایت نشده است!" });
        } else {
          const data = req.body;
          data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
          await Product.create(data);
          res.status(200).json({ msg: "محصول یا مقاله با موفقیت اضافه شد!" });
        }
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newProduct = newProduct;

const updateProduct = async (req, res) => {
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
        const theFeatures = req.body.features;
        const featuresError = theFeatures.filter((fe) => !fe.includes(":"));
        if (featuresError.length > 0) {
          res.status(422).json({ msg: "الگوی بخش ویژگی ها رعایت نشده است!" });
        } else {
          const data = req.body;
          data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
          await Product.findByIdAndUpdate(req.params.id, data, {
            new: true,
          });
          res.status(200).json({ msg: "محصول با موفقیت آپدیت شد!" });
        }
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateProduct = updateProduct;

const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "محصول با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeProduct = removeProduct;

const getOneProduct = async (req, res) => {
  try {
    const targetProduct = await Product.findOne({
      slug: req.params.slug,
    }).select({ mainFile: false });
    if (targetProduct.published == true) {
      // ADD ONE TO PAGE VIEW
      const newProduct = {
        pageView: targetProduct.pageView + 1,
      };
      await Product.findByIdAndUpdate(targetProduct._id, newProduct, {
        new: true,
      });
      res.status(200).json(targetProduct);
    } else {
      res.status(400).json({ msg: "محصول هنوز منتشر نشده است!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneProduct = getOneProduct;

const getOneProductById = async (req, res) => {
  try {
    const targetProduct = await Product.findById(req.params.id);
    res.status(200).json(targetProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneProductById = getOneProductById;

const getNewProducts = async (req, res) => {
  try {
    const newApps = await Product.find({
      published: true,
      typeOfProduct: "app",
    })
      .sort({ _id: -1 })
      .limit(8)
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        price: 1,
        typeOfProduct: 1,
        pageView: 1,
        categories: 1,
        buyNumber: 1,
      });
    const newBooks = await Product.find({
      published: true,
      typeOfProduct: "book",
    })
      .sort({ _id: -1 })
      .limit(8)
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        price: 1,
        typeOfProduct: 1,
        pageView: 1,
        categories: 1,
        buyNumber: 1,
      });
    const newGFs = await Product.find({
      published: true,
      typeOfProduct: "gr",
    })
      .sort({ _id: -1 })
      .limit(8)
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        price: 1,
        typeOfProduct: 1,
        pageView: 1,
        features: 1,
        categories: 1,
        buyNumber: 1,
      });
    res.status(200).json({ newApps, newBooks, newGFs });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getNewProducts = getNewProducts;

const getMostPopularProducts = async (req, res) => {
  try {
    const GoalProducts = await Product.find({ published: true })
      .sort({ buyNumber: -1 })
      .limit(3)
      .select({
        title: 1,
        slug: 1,
      });
    res.status(200).json(GoalProducts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getMostPopularProducts = getMostPopularProducts;

// THIS RELATED ProductS ARE FOR SINGLE product page
const getRelatedProductsByIds = async (req, res) => {
  try {
    const goalIds = req.body.goalIds;
    const GoalProducts = await Product.find({
      _id: goalIds,
    }).select({
      title: 1,
      slug: 1,
      image: 1,
      imageAlt: 1,
      price: 1,
      typeOfProduct: 1,
      pageView: 1,
      features: 1,
      categories: 1,
      buyNumber: 1,
    });
    res.status(200).json(GoalProducts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getRelatedProductsByIds = getRelatedProductsByIds;

const getOneTypeProducts = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalProducts = await Product.find({
        typeOfProduct: req.params.typeOfProduct,
      })
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          updatedAt: 1,
          image: 1,
          imageAlt: 1,
          published: 1,
          pageView: 1,
          price: 1,
          typeOfProduct: 1,
          buyNumber: 1,
        });
      const AllProductsNumber = await (
        await Product.find({
          typeOfProduct: req.params.typeOfProduct,
        })
      ).length;
      res.status(200).json({ GoalProducts, AllProductsNumber });
    } else {
      const AllProducts = await Product.find({
        typeOfProduct: req.params.typeOfProduct,
      })
        .sort({ _id: -1 })
        .select({ mainFile: false });
      res.status(200).json(AllProducts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneTypeProducts = getOneTypeProducts;
