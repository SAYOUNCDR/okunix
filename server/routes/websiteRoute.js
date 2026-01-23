const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { createWebsite, getUserWebsites, getWebsite, getTrackedData, getTrackingScript } = require("../controllers/websiteController");

router.post("/createWebsite", verifyToken, createWebsite);

router.get("/getUserWebsites", verifyToken, getUserWebsites);

router.get("/getWebsite/:websiteId", verifyToken, getWebsite);

router.get("/getTrackedData/:websiteId", verifyToken, getTrackedData);

router.get("/getTrackingScript/:websiteId", verifyToken, getTrackingScript);


module.exports = router;