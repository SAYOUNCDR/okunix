const express = require("express");
const { getStats, getActivityChart, getLocationMetrics, getEnvironmentMetrics } = require("../controllers/analyticsController");
const verifyToken = require("../middleware/authMiddleware")

const router = express.Router();

// Protect all analytics routes - only logged in users can view their dashboards
router.use(verifyToken);

router.get("/stats/:websiteId", getStats);
router.get("/chart/:websiteId", getActivityChart);
router.get("/location/:websiteId", getLocationMetrics);
router.get("/environment/:websiteId", getEnvironmentMetrics);

module.exports = router;
