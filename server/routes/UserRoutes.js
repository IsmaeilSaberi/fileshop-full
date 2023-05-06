const express = require("express");
const router = express();
const { check } = require("express-validator");
const User = require("../models/User");

const UserCtrl = require("../controllers/UserCtrl");
router.get("/users", UserCtrl.getAllUsers);
router.post(
  "/register-user",
  [
    check(
      "username",
      "تعداد کاراکتر نام کاربری باید بیشتر از  8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
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
    check(
      "displayname",
      "تعداد کاراکتر نام نمایشی باید بیشتر از  8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "password",
      "تعداد کاراکتر رمز عبور باید بیشتر از  8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check("email", "فرمت ایمیل اشتباه است!").isEmail(),
    check("email", "لطفا ایمیل دیگری را انتخاب کنید!").custom((value) => {
      return User.find({
        email: value,
      }).then((user) => {
        if (user.length > 1) {
          throw new Error("لطفا ایمیل دیگری را انتخاب کنید!");
        }
      });
    }),
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
  "/update-user/:id",
  [
    check(
      "username",
      "تعداد کاراکتر نام کاربری باید بیشتر از  8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "displayname",
      "تعداد کاراکتر نام نمایشی باید بیشتر از  8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "password",
      "تعداد کاراکتر رمز عبور باید بیشتر از  8 و تا 20 کاراکتر باشد!"
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
  [
    check(
      "displayname",
      "تعداد کاراکتر نام نمایشی باید بیشتر از  8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
    check(
      "password",
      "تعداد کاراکتر رمز عبور باید بیشتر از  8 و تا 20 کاراکتر باشد!"
    ).isLength({
      min: 8,
      max: 20,
    }),
  ],
  UserCtrl.updateMiniUser
);
router.post("/remove-user/:id", UserCtrl.removeUser);
router.get("/get-user/:id", UserCtrl.getOneUserById);
router.post(
  "/search-user",
  [check("email", "فرمت ایمیل اشتباه است!").isEmail()],
  UserCtrl.searchUsers
);

module.exports = router;
