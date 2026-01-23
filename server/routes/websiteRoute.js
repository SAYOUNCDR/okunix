const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { createWebsite, getUserWebsites } = require("../controllers/websiteController");

router.post("/createWebsite", verifyToken, createWebsite);

router.get("/getUserWebsites", verifyToken, getUserWebsites);


module.exports = router;