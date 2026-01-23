const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { createWebsite, getUserWebsites, getWebsite } = require("../controllers/websiteController");

router.post("/createWebsite", verifyToken, createWebsite);

router.get("/getUserWebsites", verifyToken, getUserWebsites);

router.get("/getWebsite/:websiteId", verifyToken, getWebsite);


module.exports = router;