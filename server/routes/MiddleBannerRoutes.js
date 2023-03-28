const express = require("express");
const router = express();

const MiddleBannerCtrl = require("../controllers/MiddleBannerCtrl");
router.get("/middle-banners", MiddleBannerCtrl.getAllMiddleBanner);
router.post("/new-middle-banner", MiddleBannerCtrl.newMiddleBanner);

module.exports = router;
