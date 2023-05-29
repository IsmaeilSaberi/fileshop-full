const express = require("express");
const router = express();
const { check } = require("express-validator");
const User = require("../models/User");
const UserCtrl = require("../controllers/UserCtrl");

const isAdmin = require("../middlewares/isAdmin");
const userExist = require("../middlewares/userExist");

// EXPRESS RATE LIMIT
const rateLimit = require("express-rate-limit");
const loginRegisterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  stausCode: 200,
  handler: function (req, res) {
    res.status(429).json({
      msg: "به دلیل تعدد، درخواست های شما به مدت 15 دقیقه مسدود شده است. بعد از این زمان می توانید دوباره امتحان کنید!",
    });
  },
});

router.get("/users", isAdmin, UserCtrl.getAllUsers);

router.post(
  "/register-user",
  loginRegisterLimiter,
  [
    check(
      "username",
      "تعداد کاراکتر نام کاربری باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "displayname",
      "تعداد کاراکتر نام نمایشی باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "password",
      "تعداد کاراکتر رمز عبور باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check("email", "فرمت ایمیل اشتباه است!").isEmail(),
    check(
      "favoriteProducts",
      "فرمت یکی از ورودی های ثبت نام کاربر اشتباه است!"
    ).isArray(),
    check(
      "userProducts",
      "فرمت یکی از ورودی های ثبت نام کاربر اشتباه است!"
    ).isArray(),
    check(
      "comments",
      "فرمت یکی از ورودی های ثبت نام کاربر اشتباه است!"
    ).isArray(),
    check(
      "payments",
      "فرمت یکی از ورودی های ثبت نام کاربر اشتباه است!"
    ).isArray(),
    check("cart", "فرمت یکی از ورودی های ثبت نام کاربر اشتباه است!").isArray(),
    check(
      "viewed",
      "فرمت یکی از ورودی های ثبت نام کاربر اشتباه است!"
    ).isBoolean(),
    check(
      "userIsActive",
      "فرمت یکی از ورودی های ثبت نام کاربر اشتباه است!"
    ).isBoolean(),
  ],
  UserCtrl.registerUser
);

router.post(
  "/user-activation-code-again",
  userExist,
  UserCtrl.userActivationCodeAgain
);

router.post(
  "/login-user",
  loginRegisterLimiter,
  [
    check(
      "password",
      "تعداد کاراکتر رمز عبور باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check("email", "فرمت ایمیل اشتباه است!").isEmail(),
  ],
  UserCtrl.loginUser
);

router.post(
  "/update-user/:id",
  isAdmin,
  [
    check(
      "username",
      "تعداد کاراکتر نام کاربری باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "displayname",
      "تعداد کاراکتر نام نمایشی باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check("email", "فرمت ایمیل اشتباه است!").isEmail(),
    check("username", "لطفا نام کاربری دیگری را انتخاب کنید!").custom(
      (value) => {
        return User.find({
          username: value,
        }).then((user) => {
          if (user.length > 1) {
            throw new Error("لطفا نام کاربری دیگری را انتخاب کنید!");
          }
        });
      }
    ),
    check("email", "لطفا ایمیل دیگری را انتخاب کنید!").custom((value) => {
      return User.find({
        email: value,
      }).then((user) => {
        if (user.length > 1) {
          throw new Error("لطفا ایمیل دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  UserCtrl.updateUser
);

router.post(
  "/update-mini-user/:id",
  userExist,
  [
    check(
      "displayname",
      "تعداد کاراکتر نام نمایشی باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "password",
      "تعداد کاراکتر رمز عبور باید 8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
  ],
  UserCtrl.updateMiniUser
);

router.post("/remove-user/:id", isAdmin, UserCtrl.removeUser);

// FOR ADMIN
router.get("/get-user/:id", isAdmin, UserCtrl.getOneUserById);

// FOR USER
router.get("/get-user-data", userExist, UserCtrl.getUserDataAccount);

router.post(
  "/search-user",
  isAdmin,
  [check("email", "فرمت ایمیل اشتباه است!").isEmail()],
  UserCtrl.searchUsers
);

router.get(
  "/get-part-of-user-data/:slug",
  userExist,
  UserCtrl.getPartOfUserData
);

//EMAIL SEND CHANGER
router.post("/update-email-user", userExist, UserCtrl.emailSendChanger);

router.post("/confirm-user-email", userExist, UserCtrl.confirmEmail);

router.post("/favorite-product", userExist, UserCtrl.favoriteProductManage);

router.post("/cart-manager", userExist, UserCtrl.cartManager);

router.get("/cart-number", UserCtrl.cartNumber);

router.get("/uncheck-payment/:id", isAdmin, UserCtrl.uncheckPayment);

router.get("/uncheck-comment/:id", isAdmin, UserCtrl.uncheckComment);

module.exports = router;
