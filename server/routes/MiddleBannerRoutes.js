const express = require("express");
const router = express();
const { check } = require("express-validator");

const MiddleBannerCtrl = require("../controllers/MiddleBannerCtrl");
router.get("/middle-banners", MiddleBannerCtrl.getAllMiddleBanner);
router.post(
  "/new-middle-banner",
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
  ],
  MiddleBannerCtrl.newMiddleBanner
);
router.post(
  "/update-middle-banner/:id",
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
  ],
  MiddleBannerCtrl.updateMiddleBanner
);
router.post("/remove-middle-banner/:id", MiddleBannerCtrl.removeMiddleBanner);
router.get("/get-middle-banner/:id", MiddleBannerCtrl.getOneMiddleBanner);
router.get("/get-active-middle-banner", MiddleBannerCtrl.getActiveBanners);

module.exports = router;
