const User = require("../models/User");
const { validationResult } = require("express-validator");

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
      const AllUsers = await User.find().sort({ _id: -1 });
      res.status(200).json(AllUsers);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllUsers = getAllUsers;

//REGISTER
// const newUser = async (req, res) => {
//   try {
//     /////EXPRESS VALIDATOR
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(422).json({ msg: errors.errors[0].msg });
//     } else {
//       if (
//         req.body.image.endsWith(".png") ||
//         req.body.image.endsWith(".jpg") ||
//         req.body.image.endsWith(".jpeg") ||
//         req.body.image.endsWith(".webp")
//       ) {
//         const data = req.body;
//         data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
//         await User.create(data);
//         res.status(200).json({ msg: "پست یا مقاله با موفقیت اضافه شد!" });
//       } else {
//         res.status(422).json({ msg: "فرمت عکس درست نیست!" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// };
// module.exports.newUser = newUser;

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
      data.password = req.body.password.replace(/\s+/g, "").toLowerCase();
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
        const data = req.body;
        data.displayname = req.body.displayname
          .replace(/\s+/g, "_")
          .toLowerCase();
        data.password = req.body.password.replace(/\s+/g, "").toLowerCase();
        await User.findByIdAndUpdate(req.params.id, data, {
          new: true,
        });
      }
      res.status(200).json({ msg: "اطلاعات شما با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateMiniUser = updateMiniUser;

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
    const targetUser = await User.findById(req.params.id);
    res.status(200).json(targetUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneUserById = getOneUserById;

const searchUsers = async (req, res) => {
  try {
    const theUser = await User.find({ email: req.body.email });
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
module.exports.searchUsers = searchUsers;
