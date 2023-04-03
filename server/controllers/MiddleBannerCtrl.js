const MiddleBanner = require("../models/MiddleBanner");

const getAllMiddleBanner = async (req, res) => {
  try {
    if (req.query.pn) {
      const paginate = 2;
      const pageNumber = req.query.pn;
      const GoalMiddleBanners = await MiddleBanner.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate);
      const AllMiddleBannersNumber = await (await MiddleBanner.find()).length;
      res.status(200).json({ GoalMiddleBanners, AllMiddleBannersNumber });
    } else {
      const AllMiddleBanners = await MiddleBanner.find();
      res.status(200).json(AllMiddleBanners);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error!" });
  }
};
module.exports.getAllMiddleBanner = getAllMiddleBanner;

const newMiddleBanner = async (req, res) => {
  try {
    const newMiddleBanner = new MiddleBanner({
      image: req.body.image,
      imageAlt: req.body.imageAlt,
      situation: req.body.situation,
      link: req.body.link,
      date: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    newMiddleBanner
      .save()
      .then((d) => {
        res.status(200).json({ msg: "بنر میانی با موفقیت ذخیره شد!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ msg: "خطا دز ذخیره بنر میانی!!!" });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error" });
  }
};
module.exports.newMiddleBanner = newMiddleBanner;

const updateMiddleBanner = async (req, res) => {
  try {
    const id = req.body.id;
    await MiddleBanner.updateOne(
      { _id: id },
      {
        $set: {
          image: req.body.image,
          imageAlt: req.body.imageAlt,
          situation: req.body.situation,
          link: req.body.link,
          date: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      }
    );
    res.status(200).json({ msg: "بنر میانی با موفقیت آپدیت شد!" });
  } catch (error) {
    res.status(400).json({ msg: "error!" });
  }
};

module.exports.updateMiddleBanner = updateMiddleBanner;

const removeMiddleBanner = async (req, res) => {
  try {
    await MiddleBanner.deleteOne({ _id: req.body.goalId });
    res.status(200).json({ msg: "بنر میانی با موفقیت حذف شد!" });
  } catch (error) {
    res.status(400).json({ msg: "error!" });
  }
};

module.exports.removeMiddleBanner = removeMiddleBanner;

const getOneMiddleBanner = async (req, res) => {
  try {
    const goalId = req.params.id;
    const targetMiddleBanner = await MiddleBanner.findById(goalId);
    res.status(200).json(targetMiddleBanner);
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

module.exports.getOneMiddleBanner = getOneMiddleBanner;
