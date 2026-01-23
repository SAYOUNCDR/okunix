const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { createWebsite } = require("../controllers/websiteController");

router.post("/create", createWebsite);


router.get("/getAllWebsites", verifyToken, (req, res) => {
    res.status(200).json({ message: "All websites fetched successfully" });
});


module.exports = router;