const MiddleBanner = require("../models/MiddleBanner");
const { validationResult } = require("express-validator");

const getAllMiddleBanner = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalMiddleBanners = await MiddleBanner.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          image: 1,
          imageAlt: 1,
          date: 1,
          situation: 1,
        });
      const AllMiddleBannersNumber = await (await MiddleBanner.find()).length;
      res.status(200).json({ GoalMiddleBanners, AllMiddleBannersNumber });
    } else {
      const AllMiddleBanners = await MiddleBanner.find().sort({ _id: -1 });
      res.status(200).json(AllMiddleBanners);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllMiddleBanner = getAllMiddleBanner;

const newMiddleBanner = async (req, res) => {
  ////// new simple method for create a middle banner
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
        await MiddleBanner.create(req.body);
        res.status(200).json({ msg: "بنر تبلیغاتی با موفقیت اضافه شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  /////// detailed and complex method for create a middle banner
  // try {
  //   const newMiddleBanner = new MiddleBanner({
  //     image: req.body.image,
  //     imageAlt: req.body.imageAlt,
  //     situation: req.body.situation,
  //     link: req.body.link,
  //     date: new Date().toLocaleDateString("fa-IR", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   });
  //   newMiddleBanner
  //     .save()
  //     .then((d) => {
  //       res.status(200).json({ msg: "بنر میانی با موفقیت ذخیره شد!" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).json({ msg: "خطا دز ذخیره بنر میانی!!!" });
  //     });
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).json({ msg: "error" });
  // }
};
module.exports.newMiddleBanner = newMiddleBanner;

const updateMiddleBanner = async (req, res) => {
  ////// a simple method for update a middle banner
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
        await MiddleBanner.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json({ msg: "بنر تبلیغاتی با موفقیت آپدیت شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }

  /////// a complex model for update a middle banner
  // try {
  //   const id = req.body.id;
  //   await MiddleBanner.updateOne(
  //     { _id: id },
  //     {
  //       $set: {
  //         image: req.body.image,
  //         imageAlt: req.body.imageAlt,
  //         situation: req.body.situation,
  //         link: req.body.link,
  //         date: new Date().toLocaleDateString("fa-IR", {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         }),
  //       },
  //     }
  //   );
  //   res.status(200).json({ msg: "بنر میانی با موفقیت آپدیت شد!" });
  // } catch (error) {
  //   res.status(400).json({ msg: "error!" });
  // }
};

module.exports.updateMiddleBanner = updateMiddleBanner;

const removeMiddleBanner = async (req, res) => {
  ////// a simple method for remove a middle banner
  try {
    await MiddleBanner.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "بنر تبلیغاتی با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  /////// a complex method for remove a middle banner
  // try {
  //   await MiddleBanner.deleteOne({ _id: req.body.id });
  //   res.status(200).json({ msg: "بنر میانی با موفقیت حذف شد!" });
  // } catch (error) {
  //   res.status(400).json({ msg: "error!" });
  // }
};

module.exports.removeMiddleBanner = removeMiddleBanner;

const getOneMiddleBanner = async (req, res) => {
  try {
    const goalId = req.params.id;
    const targetMiddleBanner = await MiddleBanner.findById(goalId);
    res.status(200).json(targetMiddleBanner);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.getOneMiddleBanner = getOneMiddleBanner;

const getActiveBanners = async (req, res) => {
  try {
    const ActiveBanners = await MiddleBanner.find({ situation: true }).select({
      image: 1,
      imageAlt: 1,
      link: 1,
    });
    res.status(200).json(ActiveBanners);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.getActiveBanners = getActiveBanners;
