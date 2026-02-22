const express = require("express");
const { getStats, getActivityChart, getLocationMetrics, getEnvironmentMetrics, getHeatmapData } = require("../controllers/analyticsController");
const verifyToken = require("../middleware/authMiddleware")

const router = express.Router();

// Protect all analytics routes - only logged in users can view their dashboards
router.use(verifyToken);

router.get("/stats/:websiteId", getStats);
router.get("/chart/:websiteId", getActivityChart);
router.get("/location/:websiteId", getLocationMetrics);
router.get("/environment/:websiteId", getEnvironmentMetrics);
router.get("/heatmap/:websiteId", getHeatmapData);

module.exports = router;
