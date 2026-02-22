const express = require("express");
const { getStats, getActivityChart } = require("../controllers/analyticsController");
const  verifyToken  = require("../middleware/authMiddleware")

const router = express.Router();

// Protect all analytics routes - only logged in users can view their dashboards
router.use(verifyToken);

router.get("/stats/:websiteId", getStats);
router.get("/chart/:websiteId", getActivityChart);

module.exports = router;
