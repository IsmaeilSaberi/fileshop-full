const express = require("express");
const router = express();
const { check } = require("express-validator");

const isAdmin = require("../middlewares/isAdmin");

const MiddleBannerCtrl = require("../controllers/MiddleBannerCtrl");
router.get("/middle-banners", isAdmin, MiddleBannerCtrl.getAllMiddleBanner);
router.post(
  "/new-middle-banner",
  isAdmin,
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
  isAdmin,
  [
    check("imageAlt", "تعداد کاراکتر آلت باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean(),
  ],
  MiddleBannerCtrl.updateMiddleBanner
);
router.post(
  "/remove-middle-banner/:id",
  isAdmin,
  MiddleBannerCtrl.removeMiddleBanner
);
router.get(
  "/get-middle-banner/:id",
  isAdmin,
  MiddleBannerCtrl.getOneMiddleBanner
);
router.get("/get-active-middle-banner", MiddleBannerCtrl.getActiveBanners);

module.exports = router;
