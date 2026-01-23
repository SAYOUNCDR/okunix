const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.post("/create", verifyToken, (req, res) => {
    res.status(200).json({ message: "Website created successfully" });
});


router.get("/getAllWebsites", verifyToken, (req, res) => {
    res.status(200).json({ message: "All websites fetched successfully" });
});


module.exports = router;