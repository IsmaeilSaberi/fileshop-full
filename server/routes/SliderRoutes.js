const express = require("express");
const router = express();
const { check } = require("express-validator");

const isAdmin = require("../middlewares/isAdmin");

const SliderCtrl = require("../controllers/SliderCtrl");

router.get("/sliders", isAdmin, SliderCtrl.getAllSliders);
router.post(
  "/new-slider",
  isAdmin,
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("sorter", "فرمت بخش سورتر اشتباه است!").isNumeric(),
  ],
  SliderCtrl.newSlider
);
router.post(
  "/update-slider/:id",
  isAdmin,
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check("sorter", "فرمت بخش سورتر اشتباه است!").isNumeric(),
  ],
  SliderCtrl.updateSlider
);
router.post("/remove-slider/:id", isAdmin, SliderCtrl.removeSlider);
router.get("/get-slider/:id", isAdmin, SliderCtrl.getOneSlider);
router.get("/get-active-sliders", SliderCtrl.getActiveSliders);

module.exports = router;
