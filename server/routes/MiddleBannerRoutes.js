const express = require("express");
const router = express();

const MiddleBannerCtrl = require("../controllers/MiddleBannerCtrl");
router.get("/middle-banners", MiddleBannerCtrl.getAllMiddleBanner);
router.post("/new-middle-banner", MiddleBannerCtrl.newMiddleBanner);
router.post("/update-middle-banner/:id", MiddleBannerCtrl.updateMiddleBanner);
router.post("/remove-middle-banner/:id", MiddleBannerCtrl.removeMiddleBanner);
router.get("/get-middle-banner/:id", MiddleBannerCtrl.getOneMiddleBanner);
router.get("/get-active-middle-banner", MiddleBannerCtrl.getActiveBanners);

module.exports = router;
