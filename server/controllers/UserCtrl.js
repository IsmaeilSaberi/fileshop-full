const User = require("../models/User");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const getAllUsers = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalUsers = await User.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          username: 1,
          displayname: 1,
          email: 1,
          viewed: 1,
          userIsActive: 1,
          createdAt: 1,
        });
      const AllUsersNumber = await (await User.find()).length;
      res.status(200).json({ GoalUsers, AllUsersNumber });
    } else {
      const AllUsers = await User.find()
        .sort({ _id: -1 })
        .select({ password: false });
      res.status(200).json(AllUsers);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllUsers = getAllUsers;

//REGISTER USER
const registerUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      //CHECKING OF EQUATION OF PASSWORD AND CONFIRM PASSWORD
      if (req.body.password == req.body.rePassword) {
        //CHECKING OF EXISTANCE OF DUPLICATE EMAIL
        const emailExist = await User.find({ email: req.body.email });
        if (emailExist.length < 1) {
          //CHECKING OF EXISTANCE OF DUPLICATE USERNAME
          const usernameExist = await User.find({
            username: req.body.username,
          });
          if (usernameExist.length < 1) {
            //MAKING NEW USER
            const data = req.body;
            data.username = req.body.username
              .replace(/\s+/g, "_")
              .toLowerCase();
            data.displayname = req.body.displayname
              .replace(/\s+/g, "_")
              .toLowerCase();
            data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
            data.password = req.body.password.replace(/\s+/g, "").toLowerCase();
            const hashedPassword = await bcrypt.hash(data.password, 10);
            //CREATE 8 DIGITS RANDOM NUMBER
            const userActivateCode = Math.floor(
              Math.random() * 90000000 + 10000000
            );
            const newUser = new User({
              username: data.username,
              displayname: data.displayname,
              email: data.email,
              password: hashedPassword,
              favoriteProducts: [],
              userProducts: [],
              comments: [],
              payments: [],
              cart: [],
              viewed: false,
              activateCode: userActivateCode,
              userIsActive: false,
              emailSend: true,
              createdAt: new Date().toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              updatedAt: new Date().toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
            newUser
              .save()
              .then((d) => {
                //MAKING AUTH COOKIE
                const token = jwt.sign(
                  {
                    _id: newUser._id,
                    username: newUser.username,
                  },
                  process.env.TOKEN_SECRET
                );
                //SENDING SECURITY EMAIL TO USER ACCOUNT
                const MAIL_HOST = process.env.MAIL_HOST;
                const MAIL_PORT = process.env.MAIL_PORT;
                const MAIL_USER = process.env.MAIL_USER;
                const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
                const MAIL_MAIN_ADDRESS = process.env.MAIL_MAIN_ADDRESS;

                const transporter = nodemailer.createTransport({
                  host: MAIL_HOST,
                  port: MAIL_PORT,
                  tls: true,
                  auth: {
                    user: MAIL_USER,
                    pass: MAIL_PASSWORD,
                  },
                });
                transporter
                  .sendMail({
                    from: MAIL_MAIN_ADDRESS,
                    to: newUser.email,
                    subject: "تایید حساب کاربری فروشگاه فایل اسماعیل!",
                    html: `<html><head><style>strong{color: rgb(0, 81, 255);}h1{font-size: large;}</style></head><body><h1>احراز هویت فروشگاه فایل اسماعیل</h1><div>کد احراز هویت:<strong>${userActivateCode}</strong></div></body></html>`,
                  })
                  .then((d) => {
                    res
                      .status(200)
                      .json({ msg: "ثبت نام موفقیت آمیز بود!", auth: token });
                  })
                  .catch((error) => {
                    console.log(error);
                    res
                      .status(400)
                      .json({ msg: "خطا در ثبت نام!", errorMessage: error });
                  });
              })
              .catch((err) => {
                console.log(error);
                res.status(400).json(error);
              });
          } else {
            res.status(422).json({ msg: "لطفا نام کاربری دیگری وارد کنید!" });
          }
        } else {
          res.status(422).json({ msg: "لطفا ایمیل دیگری وارد کنید!" });
        }
      } else {
        res.status(422).json({ msg: "تکرار رمز عبور اشتباه است!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.registerUser = registerUser;

//LOGIN USER
const loginUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      //CHECKING OF EXISTANCE OF DUPLICATE EMAIL
      const emailExist = await User.find({ email: req.body.email });
      if (emailExist.length > 0) {
        const theUser = emailExist[0];
        const data = req.body;
        data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
        data.password = req.body.password.replace(/\s+/g, "").toLowerCase();

        const validPassword = await bcrypt.compare(
          data.password,
          theUser.password
        );
        if (validPassword == false) {
          res.status(422).json({ msg: "ایمیل یا رمز عبور اشتباه است!" });
        } else {
          // MAKING AUTH TOKEN
          const token = jwt.sign(
            { _id: theUser._id, username: theUser.username },
            process.env.TOKEN_SECRET
          );
          res
            .status(200)
            .json({ msg: "با موفقیت وارد حساب کاربری شدید!", auth: token });
        }
      } else {
        res.status(422).json({ msg: "لطفا ثبت نام کنید!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.loginUser = loginUser;

const updateUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const data = req.body;
      data.username = req.body.username.replace(/\s+/g, "_").toLowerCase();
      data.displayname = req.body.displayname
        .replace(/\s+/g, "_")
        .toLowerCase();
      data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
      await User.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      res.status(200).json({ msg: "کاربر با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateUser = updateUser;

const updateMiniUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.username ||
        req.body.email ||
        req.body.payments ||
        req.body.userProducts ||
        req.body.activateCode ||
        req.body.viewed ||
        req.body.userIsActive
      ) {
        res.status(400).json({ msg: "خطا در اطلاعات فرستاده شده!" });
      } else {
        if (req.body.password == req.body.rePassword) {
          const data = req.body;
          data.displayname = req.body.displayname
            .replace(/\s+/g, "_")
            .toLowerCase();
          const newPass = req.body.password.replace(/\s+/g, "").toLowerCase();
          data.password = await bcrypt.hash(newPass, 10);
          data.updatedAt = new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          await User.findByIdAndUpdate(req.params.id, data, {
            new: true,
          });
        } else {
          res.status(422).json({ msg: "تکرار رمز عبور اشتباه است!" });
        }
      }
      res.status(200).json({ msg: "اطلاعات شما با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateMiniUser = updateMiniUser;

const emailSendChanger = async (req, res) => {
  try {
    const newUser = {
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        min: "2-digit",
      }),
      emailSend: req.body.emailSend,
    };
    await User.findByIdAndUpdate(req.user._id, newUser, {
      new: true,
    });
    res.status(200).json({ msg: "وضعیت ارسال ایمیل تغییر کرد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.emailSendChanger = emailSendChanger;

const confirmEmail = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (theUser.activateCode == req.body.activateCode) {
      const newUser = {
        updatedAt: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        userIsActive: true,
      };
      await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
      });
      res.status(200).json({ msg: "حساب کاربری با موفقیت فعال شد!" });
    } else {
      res.status(401).json({ msg: "کد فعالسازی اشتباه است!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.confirmEmail = confirmEmail;

const removeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "کاربر با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeUser = removeUser;

const getOneUserById = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id).select({
      password: false,
    });

    // FOR ADDING FAVORITE PRODUCTS TO TARGET USER
    const targetUserFavProducts = await Product.find({
      _id: { $in: targetUser.favoriteProducts },
    }).select({ title: 1, slug: 1 });
    targetUser.favoriteProducts = targetUserFavProducts;

    // FOR ADDING CART PRODUCTS TO TARGET USER
    const targetUserCartProducts = await Product.find({
      _id: { $in: targetUser.cart },
    }).select({ title: 1, slug: 1 });
    targetUser.cart = targetUserCartProducts;

    res.status(200).json(targetUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneUserById = getOneUserById;

// FOR LOGIN REGISTER AND REDIRECT
const getUserDataAccount = async (req, res) => {
  try {
    const targetUser = await User.findById(req.user._id).select({ _id: 1 });
    res.status(200).json(targetUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getUserDataAccount = getUserDataAccount;

// ACCOUNT AND CART PAGE
const getPartOfUserData = async (req, res) => {
  try {
    const theSlug = req.params.slug;
    if (theSlug == "info") {
      const targetUser = await User.findById(req.user._id).select({
        username: 1,
        displayname: 1,
        email: 1,
        createdAt: 1,
        updatedAt: 1,
        emailSend: 1,
        userIsActive: 1,
      });
      res.status(200).json(targetUser);
    } else if (theSlug == "favorites") {
      const targetUser = await User.findById(req.user._id).select({
        favoriteProducts: 1,
      });
      const goalProducts = await Product.find({
        _id: { $in: targetUser.favoriteProducts },
      }).select({
        title: 1,
        slug: 1,
        image: 1,
        price: 1,
        shortDesc: 1,
        typeOfProduct: 1,
        buyNumber: 1,
        features: 1,
      });
      res.status(200).json(goalProducts);
    }
    // FOR CART
    else if (theSlug == "cart") {
      const targetUser = await User.findById(req.user._id).select({
        cart: 1,
      });
      const goalProducts = await Product.find({
        _id: { $in: targetUser.cart },
      }).select({
        title: 1,
        slug: 1,
        image: 1,
        price: 1,
        shortDesc: 1,
        typeOfProduct: 1,
        buyNumber: 1,
        features: 1,
      });
      res.status(200).json(goalProducts);
    } else if (theSlug == "files") {
      const targetUser = await User.findById(req.user._id).select({
        userProducts: 1,
      });
      res.status(200).json(targetUser);
    } else if (theSlug == "comments") {
      const targetUser = await User.findById(req.user._id).select({
        comments: 1,
      });
      res.status(200).json(targetUser);
    } else if (theSlug == "payments") {
      const targetUser = await User.findById(req.user._id).select({
        payments: 1,
      });
      res.status(200).json(targetUser);
    } else {
      res.status(200).json({ msg: "عدم تعیین بخش مورد نیاز!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getPartOfUserData = getPartOfUserData;

//HEADER CART NUMBER
const cartNumber = async (req, res) => {
  try {
    let token = req.cookies.auth_cookie;
    if (!token) {
      token = req.headers.auth_cookie;
    }
    if (!token) {
      res.status(200).json({ number: 0 });
    } else {
      try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const targetUser = await User.findById(verified._id).select({
          cart: 1,
        });
        res.status(200).json({ number: targetUser.cart.length });
      } catch (error) {
        console.log(error);
        res.status(200).json({ number: 0 });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.cartNumber = cartNumber;

const searchUsers = async (req, res) => {
  try {
    const theUser = await User.find({ email: req.body.email }).select({
      password: false,
    });
    if (theUser.length > 0) {
      res.status(200).json({ userData: theUser[0] });
    } else {
      res.status(200).json({ userData: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const favoriteProductManage = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (theUser.userIsActive == true) {
      if (req.body.method == "push") {
        const newUserFavoriteProducts = [
          ...theUser.favoriteProducts,
          req.body.newFavProduct,
        ];
        let userHaveProduct = 0;
        for (let i = 0; i < theUser.favoriteProducts.length; i++) {
          if (req.body.newFavProduct == theUser.favoriteProducts[i]) {
            userHaveProduct = 1;
            break;
          }
        }
        if (userHaveProduct == 0) {
          const newUser = {
            favoriteProducts: newUserFavoriteProducts,
          };
          await User.findByIdAndUpdate(req.user._id, newUser, {
            new: true,
          });
          res.status(200).json({ msg: "به علاقه مندی ها اضافه شد!" });
        } else {
          res
            .status(401)
            .json({ msg: "قبلا به محصولات مورد علاقه اضافه شده است!" });
        }
      } else if (req.body.method == "remove") {
        const oldFavoriteProducts = theUser.favoriteProducts;
        for (let i = 0; i < oldFavoriteProducts.length; i++) {
          if (oldFavoriteProducts[i] == req.body.goalFavProductId) {
            let updatedUserFav = oldFavoriteProducts;
            if (i > -1) {
              updatedUserFav.splice(i, 1);
            }
            const updatedFavPro = { favoriteProducts: updatedUserFav };
            await User.findByIdAndUpdate(req.user._id, updatedFavPro, {
              new: true,
            });
          }
        }
        res.status(200).json({ msg: "از علاقه مندی ها حذف شد!" });
      } else {
        res
          .status(401)
          .json({ msg: "خطا در ارسال اطلاعات محصولات مورد علاقه!" });
      }
    } else {
      res.status(401).json({ msg: "لطفا ایمیل خود را تایید کنید!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.favoriteProductManage = favoriteProductManage;

const cartManager = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (theUser.userIsActive == true) {
      if (req.body.method == "push") {
        const newUserCartProducts = [...theUser.cart, req.body.newCartProduct];
        let userHaveProduct = 0;
        for (let i = 0; i < theUser.cart.length; i++) {
          if (req.body.newCartProduct == theUser.cart[i]) {
            userHaveProduct = 1;
            break;
          }
        }
        if (userHaveProduct == 0) {
          const newUser = {
            cart: newUserCartProducts,
          };
          await User.findByIdAndUpdate(req.user._id, newUser, {
            new: true,
          });
          res.status(200).json({ msg: "به سبد خرید اضافه شد!" });
        } else {
          res.status(401).json({ msg: "قبلا به سبد خرید اضافه شده است!" });
        }
      } else if (req.body.method == "remove") {
        const oldCartProducts = theUser.cart;
        for (let i = 0; i < oldCartProducts.length; i++) {
          if (oldCartProducts[i] == req.body.goalCartProductId) {
            let updatedUserCart = oldCartProducts;
            if (i > -1) {
              updatedUserCart.splice(i, 1);
            }
            const updatedCartPro = { cart: updatedUserCart };
            await User.findByIdAndUpdate(req.user._id, updatedCartPro, {
              new: true,
            });
          }
        }
        res.status(200).json({ msg: "از سبد خرید حذف شد!" });
      } else {
        res.status(401).json({ msg: "خطا در ارسال اطلاعات سبد خرید!" });
      }
    } else {
      res.status(401).json({ msg: "لطفا ایمیل خود را تایید کنید!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.cartManager = cartManager;

module.exports.searchUsers = searchUsers;
