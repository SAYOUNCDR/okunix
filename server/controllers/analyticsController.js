const mongoose = require("mongoose");
const TrackedData = require("../models/trackedDataModal");
const Website = require("../models/websiteModal");

exports.getStats = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user.id; // From verifyToken middleware

        // 1. Verify ownership of the website
        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) {
            return res.status(404).json({ message: "Website not found or unauthorized" });
        }

        // 2. Aggregate Stats
        const objectId = new mongoose.Types.ObjectId(websiteId);

        // Get basic counts
        const counts = await TrackedData.aggregate([
            { $match: { websiteId: objectId } },
            {
                $group: {
                    _id: null,
                    totalViews: {
                        // Count every row that is a pageview
                        $sum: { $cond: [{ $eq: ["$event", "pageview"] }, 1, 0] }
                    },
                    uniqueVisits: { $addToSet: "$sessionId" },
                    uniqueVisitors: { $addToSet: "$visitorId" }
                }
            },
            {
                $project: {
                    views: "$totalViews",
                    visits: { $size: "$uniqueVisits" },
                    visitors: { $size: "$uniqueVisitors" }
                }
            }
        ]);

        const baseStats = counts[0] || { views: 0, visits: 0, visitors: 0 };

        // 3. Calculate Bounce Rate & Visit Duration
        // This groups events by sessionId to see how many pages were viewed per session
        // and calculates the time difference between the first and last event
        const sessionStats = await TrackedData.aggregate([
            { $match: { websiteId: objectId } },
            { $sort: { createdAt: 1 } }, // Sort chronologically to get first/last event times
            {
                $group: {
                    _id: "$sessionId",
                    pageviewCount: {
                        $sum: { $cond: [{ $eq: ["$event", "pageview"] }, 1, 0] }
                    },
                    startTime: { $first: "$createdAt" },
                    endTime: { $last: "$createdAt" }
                }
            },
            {
                $project: {
                    isBounce: { $cond: [{ $eq: ["$pageviewCount", 1] }, 1, 0] },
                    // Duration in seconds (MongoDB timestamps subtract to milliseconds)
                    durationSecs: {
                        $divide: [
                            { $subtract: ["$endTime", "$startTime"] },
                            1000
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSessions: { $sum: 1 },
                    bounces: { $sum: "$isBounce" },
                    totalDurationSecs: { $sum: "$durationSecs" }
                }
            }
        ]);

        let bounceRate = "0%";
        let avgDurationFormatted = "0m 0s";

        if (sessionStats.length > 0) {
            const s = sessionStats[0];
            if (s.totalSessions > 0) {
                // Calculate Bounce Rate Percentage
                const br = (s.bounces / s.totalSessions) * 100;
                bounceRate = `${br.toFixed(1)}%`;

                // Calculate Average Duration
                const avgSecs = s.totalDurationSecs / s.totalSessions;
                const mins = Math.floor(avgSecs / 60);
                const secs = Math.floor(avgSecs % 60);
                avgDurationFormatted = `${mins}m ${secs}s`;
            }
        }

        res.status(200).json({
            visitors: baseStats.visitors,
            visits: baseStats.visits,
            views: baseStats.views,
            bounceRate,
            visitDuration: avgDurationFormatted,
        });

    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ message: "Failed to fetch analytics stats" });
    }
};

exports.getActivityChart = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user.id;

        // Verify ownership
        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) {
            return res.status(404).json({ message: "Website not found or unauthorized" });
        }

        const objectId = new mongoose.Types.ObjectId(websiteId);

        // We want the last 7 days by default
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const chartData = await TrackedData.aggregate([
            {
                $match: {
                    websiteId: objectId,
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                // Group by Date string (YYYY-MM-DD)
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalViews: {
                        $sum: { $cond: [{ $eq: ["$event", "pageview"] }, 1, 0] }
                    },
                    uniqueVisitors: { $addToSet: "$visitorId" }
                }
            },
            {
                // Format the output
                $project: {
                    _id: 0,
                    date: "$_id",
                    Views: "$totalViews",
                    Visitors: { $size: "$uniqueVisitors" }
                }
            },
            { $sort: { date: 1 } } // Sort chronologically
        ]);

        // Format Dates (e.g., "2026-02-14" to "Feb 14")
        const formattedData = chartData.map(item => {
            const dateObj = new Date(item.date);
            const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            return {
                ...item,
                date: formattedDate
            };
        });

        res.status(200).json(formattedData);

    } catch (error) {
        console.error("Chart Error:", error);
        res.status(500).json({ message: "Failed to fetch chart data" });
    }
};

exports.getLocationMetrics = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user.id;

        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) return res.status(404).json({ message: "Website not found or unauthorized" });

        const objectId = new mongoose.Types.ObjectId(websiteId);

        // Group by visitorId first so we count Unique Visitors, using their last known location
        const visitorLocations = await TrackedData.aggregate([
            { $match: { websiteId: objectId } },
            { $sort: { createdAt: 1 } },
            {
                $group: {
                    _id: "$visitorId",
                    country: { $last: "$country" },
                    region: { $last: "$region" },
                    city: { $last: "$city" }
                }
            },
            {
                $facet: {
                    Countries: [
                        { $group: { _id: "$country", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ],
                    Regions: [
                        { $group: { _id: "$region", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ],
                    Cities: [
                        { $group: { _id: "$city", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ]
                }
            }
        ]);

        const result = visitorLocations[0];

        // Calculate percentages
        const totalVisitors = result.Countries.reduce((acc, curr) => acc + curr.count, 0) || 1;
        const formatPercent = (count) => `${Math.round((count / totalVisitors) * 100)}%`;

        const formatData = (arr) => arr.map(item => ({
            name: item.name || "Unknown",
            count: item.count,
            percent: formatPercent(item.count),
            flag: "📍" // Fallback icon
        }));

        res.status(200).json({
            Countries: formatData(result.Countries),
            Regions: formatData(result.Regions),
            Cities: formatData(result.Cities),
        });

    } catch (error) {
        console.error("Location Metrics Error:", error);
        res.status(500).json({ message: "Failed to fetch location metrics" });
    }
};

exports.getEnvironmentMetrics = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user.id;

        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) return res.status(404).json({ message: "Website not found or unauthorized" });

        const objectId = new mongoose.Types.ObjectId(websiteId);

        const visitorEnvironments = await TrackedData.aggregate([
            { $match: { websiteId: objectId } },
            { $sort: { createdAt: 1 } },
            {
                $group: {
                    _id: "$visitorId",
                    browser: { $last: "$browser" },
                    os: { $last: "$os" },
                    device: { $last: "$device" }
                }
            },
            {
                $facet: {
                    Browsers: [
                        { $group: { _id: "$browser", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ],
                    OS: [
                        { $group: { _id: "$os", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ],
                    Devices: [
                        { $group: { _id: "$device", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ]
                }
            }
        ]);

        const result = visitorEnvironments[0];

        const totalVisitors = result.Browsers.reduce((acc, curr) => acc + curr.count, 0) || 1;
        const formatPercent = (count) => `${Math.round((count / totalVisitors) * 100)}%`;

        const formatData = (arr) => arr.map(item => ({
            name: item.name || "Unknown",
            count: item.count,
            percent: formatPercent(item.count)
        }));

        res.status(200).json({
            Browsers: formatData(result.Browsers),
            OS: formatData(result.OS),
            Devices: formatData(result.Devices),
        });

    } catch (error) {
        console.error("Environment Metrics Error:", error);
        res.status(500).json({ message: "Failed to fetch environment metrics" });
    }
};
