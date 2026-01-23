const express = require("express");
const router = express.Router();
const { collectData } = require("../controllers/trackerController");

// Public route - no auth middleware needed since the script calls this
router.post("/collect", collectData);

module.exports = router;
