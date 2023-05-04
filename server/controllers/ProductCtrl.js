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
        const featuresLengthError = theFeatures.filter((fe) => fe.length > 45);

        if (featuresError.length > 0) {
          res.status(422).json({ msg: "الگوی بخش ویژگی ها رعایت نشده است!" });
        } else if (featuresLengthError.length > 0) {
          res.status(422).json({
            msg: "تعداد کاراکتر زیاد برای یکی از ویژگی های اضافه شده",
          });
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
        const featuresLengthError = theFeatures.filter((fe) => fe.length > 45);

        if (featuresError.length > 0) {
          res.status(422).json({ msg: "الگوی بخش ویژگی ها رعایت نشده است!" });
        } else if (featuresLengthError.length > 0) {
          res.status(422).json({
            msg: "تعداد کاراکتر زیاد برای یکی از ویژگی های اضافه شده",
          });
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
    console.log(error);
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

const searchProducts = async (req, res) => {
  try {
    let allProducts = await Product.find({ published: 1 })
      .sort({ _id: -1 })
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        price: 1,
        shortDesc: 1,
        typeOfProduct: 1,
        pageView: 1,
        categories: 1,
        features: 1,
        buyNumber: 1,
        tags: 1,
      });

    ////KEYWORD SEARCH
    if (req.query.keyword) {
      const theKeyword = req.query.keyword;
      const goalPro = allProducts.filter(
        (pro) =>
          pro.title.replace(/\s+/g, "_").toLowerCase().includes(theKeyword) ||
          pro.imageAlt
            .replace(/\s+/g, "_")
            .toLowerCase()
            .includes(theKeyword) ||
          pro.shortDesc.replace(/\s+/g, "_").toLowerCase().includes(theKeyword)
      );
      const relatedProductTag = [];
      for (let i = 0; i < allProducts.length; i++) {
        for (let j = 0; j < allProducts[i].tags.length; j++) {
          if (allProducts[i].tags[j].includes(theKeyword)) {
            relatedProductTag.push(allProducts[i]);
          }
        }
      }
      const productsSummer = [...goalPro, ...relatedProductTag];
      let unique = (item) => [...new Set(item)];
      allProducts = unique(productsSummer);
    }
    ////ORDER BY price,buyNumber, pageView, date SEARCH
    if (req.query.orderBy) {
      let goalPro = [];
      if (req.query.orderBy == "price") {
        goalPro = allProducts.sort((a, b) =>
          Number(a.price) > Number(b.price) ? -1 : 1
        );
      } else if (req.query.orderBy == "buyNumber") {
        goalPro = allProducts.sort((a, b) =>
          a.buyNumber > b.buyNumber ? -1 : 1
        );
      } else if (req.query.orderBy == "pageView") {
        goalPro = allProducts.sort((a, b) =>
          a.pageView > b.pageView ? -1 : 1
        );
      } else {
        goalPro = allProducts;
      }
      allProducts = goalPro;
    }
    ////TYPE OF PRODUCT gr,book,app SEARCH
    if (req.query.type) {
      let goalPro = allProducts.filter(
        (pro) => pro.typeOfProduct == req.query.type
      );
      allProducts = goalPro;
    }
    ////MIN PRICE SEARCH
    if (req.query.minP) {
      const goalPro = allProducts.filter((pro) =>
        Number(pro.price >= req.query.minP)
      );
      allProducts = goalPro;
    }
    //// MAX PRICE SEARCH
    if (req.query.maxP) {
      const goalPro = allProducts.filter(
        (pro) => Number(pro.price) <= req.query.maxP
      );
      allProducts = goalPro;
    }
    ////CATEGORIES SEARCH
    if (req.query.categories) {
      const goalPro = [];
      const categoriesSlugs = req.query.categories.split(",");
      for (let i = 0; i < allProducts.length; i++) {
        for (let j = 0; j < allProducts[i].categories.length; j++) {
          for (let t = 0; t < categoriesSlugs.length; t++) {
            if (allProducts[i].categories[j].slug == categoriesSlugs[t]) {
              goalPro.push(allProducts[i]);
            }
          }
        }
      }
      let unique = (item) => [...new Set(item)];
      allProducts = unique(goalPro);
    }

    ////PAGINATION AND allProductsNumber SEARCH
    const productsNumber = allProducts.length;
    const paginate = req.query.pgn ? req.query.pgn : 12;
    const pageNumber = req.query.pn ? req.query.pn : 1;
    const startNumber = (pageNumber - 1) * paginate;
    const endNumber = paginate * pageNumber;
    const goalPro = [];
    if (paginate >= 0 && pageNumber >= 0) {
      for (let i = startNumber; i < endNumber; i++) {
        if (allProducts[i] != null) {
          goalPro.push(allProducts[i]);
        }
      }
    }
    allProducts = goalPro;

    const number = Math.ceil(productsNumber / paginate);
    const allBtns = [...Array(Math.ceil(number)).keys()];
    const btns = [];
    for (let i = 0; i < allBtns.length; i++) {
      if (
        i == 0 ||
        i == allBtns.length - 1 ||
        (i > Number(pageNumber) - 3 && i < Number(pageNumber) + 1)
      ) {
        btns.push(i);
      }
    }

    const outputData = [];
    for (let i = 0; i < allProducts.length; i++) {
      const obj = {
        _id: allProducts[i]._id,
        title: allProducts[i].title,
        slug: allProducts[i].slug,
        image: allProducts[i].image,
        imageAlt: allProducts[i].imageAlt,
        price: allProducts[i].price,
        typeOfProduct: allProducts[i].typeOfProduct,
        features: allProducts[i].features,
        categories: allProducts[i].categories,
        buyNumber: allProducts[i].buyNumber,
        pageView: allProducts[i].pageView,
      };
      outputData.push(obj);
    }

    res.status(200).json({ allProducts: outputData, btns, productsNumber });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.searchProducts = searchProducts;
