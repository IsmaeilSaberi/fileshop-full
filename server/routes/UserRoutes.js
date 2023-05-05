const express = require("express");
const router = express();
const { check } = require("express-validator");
const User = require("../models/User");

const UserCtrl = require("../controllers/UserCtrl");
router.get("/users", UserCtrl.getAllUsers);
// router.post(
//   "/new-user",
//   [
//     check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
//       min: 8,
//     }),
//     check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
//     check("relatedusers", "فرمت بخش مقالات مرتبط اشتباه است!").isArray(),
//     check("tags", "فرمت بخش برچسب ها اشتباه است!").isArray(),
//     check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
//       return User.find({
//         slug: value,
//       }).then((user) => {
//         if (user.length > 0) {
//           throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
//         }
//       });
//     }),
//   ],
//   UserCtrl.newuser
// );
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
