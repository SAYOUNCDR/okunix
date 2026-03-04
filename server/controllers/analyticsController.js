const mongoose = require("mongoose");
const TrackedData = require("../models/trackedDataModal");
const Website = require("../models/websiteModal");

const parseRangeBounds = (rangeStr) => {
    const match = (rangeStr || "24h").match(/^(\d+)([hdM])$/);
    let durationMs = 0;
    if (match) {
        const value = parseInt(match[1]);
        const unit = match[2];
        if (unit === "h") durationMs = value * 60 * 60 * 1000;
        else if (unit === "d") durationMs = value * 24 * 60 * 60 * 1000;
        else if (unit === "M") durationMs = value * 30 * 24 * 60 * 60 * 1000; // rough month
    } else {
        durationMs = 24 * 60 * 60 * 1000; // Default 24h
    }
    const now = new Date();
    const currentStart = new Date(now.getTime() - Math.abs(durationMs));
    const previousStart = new Date(currentStart.getTime() - Math.abs(durationMs));
    return { now, currentStart, previousStart, durationMs };
};

exports.getStats = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const { range = "7d" } = req.query; // Default to 7 days
        const userId = req.user.id; // From verifyToken middleware

        // 1. Verify ownership of the website
        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) {
            return res.status(404).json({ message: "Website not found or unauthorized" });
        }

        const objectId = new mongoose.Types.ObjectId(websiteId);

        // 2. Determine Date Ranges
        const bounds = parseRangeBounds(range);
        const { now, currentStart, previousStart } = bounds;
        const currentStartDate = currentStart;
        const previousEndDate = currentStart;
        const previousStartDate = previousStart;


        // 3. Helper to Aggregate Stats for Date Range
        const generateStatsForRange = async (start, end) => {
            const matchQuery = {
                websiteId: objectId,
                createdAt: { $gte: start, $lte: end }
            };

            const counts = await TrackedData.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: null,
                        totalViews: {
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

            const sessionStats = await TrackedData.aggregate([
                { $match: matchQuery },
                { $sort: { createdAt: 1 } },
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

            const baseStats = counts[0] || { views: 0, visits: 0, visitors: 0 };
            let rawBounceRate = 0;
            let rawDurationSecs = 0;

            if (sessionStats.length > 0) {
                const s = sessionStats[0];
                if (s.totalSessions > 0) {
                    rawBounceRate = (s.bounces / s.totalSessions) * 100;
                    rawDurationSecs = s.totalDurationSecs / s.totalSessions;
                }
            }

            return {
                visitors: baseStats.visitors,
                visits: baseStats.visits,
                views: baseStats.views,
                bounceRate: rawBounceRate,
                visitDuration: rawDurationSecs
            };
        };

        // 4. Run Concurrent Aggregations
        const [currentStats, previousStats] = await Promise.all([
            generateStatsForRange(currentStartDate, now),
            generateStatsForRange(previousStartDate, previousEndDate)
        ]);

        // 5. Delta Format Helper
        const formatObject = (currVal, prevVal, isPercentage = false, isTime = false) => {
            let change = 0;
            if (prevVal === 0) {
                // Handle Infinity bounds gracefully
                if (currVal > 0) change = 100;
                else change = 0;
            } else {
                change = ((currVal - prevVal) / prevVal) * 100;
            }

            let formattedValue = currVal;
            if (isPercentage) {
                formattedValue = `${currVal.toFixed(1)}%`;
            } else if (isTime) {
                const mins = Math.floor(currVal / 60);
                const secs = Math.floor(currVal % 60);
                formattedValue = `${mins}m ${secs}s`;
            }

            return {
                value: formattedValue,
                change: parseFloat(change.toFixed(1))
            };
        };

        // 6. Output Generation
        res.status(200).json({
            visitors: formatObject(currentStats.visitors, previousStats.visitors),
            visits: formatObject(currentStats.visits, previousStats.visits),
            views: formatObject(currentStats.views, previousStats.views),
            bounceRate: formatObject(currentStats.bounceRate, previousStats.bounceRate, true, false),
            visitDuration: formatObject(currentStats.visitDuration, previousStats.visitDuration, false, true),
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

        const { range } = req.query;
        const { currentStart } = parseRangeBounds(range);

        const chartData = await TrackedData.aggregate([
            {
                $match: {
                    websiteId: objectId,
                    createdAt: { $gte: currentStart }
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

        const { range } = req.query;
        const { currentStart, now } = parseRangeBounds(range);

        // Group by visitorId first so we count Unique Visitors, using their last known location
        const visitorLocations = await TrackedData.aggregate([
            { $match: { websiteId: objectId, createdAt: { $gte: currentStart, $lte: now } } },
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
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ],
                    Regions: [
                        { $group: { _id: "$region", country: { $first: "$country" }, count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $project: { _id: 0, name: "$_id", country: 1, count: 1 } }
                    ],
                    Cities: [
                        { $group: { _id: "$city", country: { $first: "$country" }, count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $project: { _id: 0, name: "$_id", country: 1, count: 1 } }
                    ]
                }
            }
        ]);

        const result = visitorLocations[0];

        // Calculate percentages
        const totalVisitors = result.Countries.reduce((acc, curr) => acc + curr.count, 0) || 1;
        const formatPercent = (count) => `${Math.round((count / totalVisitors) * 100)}%`;

        const formatData = (arr, isCountry = false) => arr.map(item => ({
            name: item.name || "Unknown",
            country: isCountry ? item.name : item.country || "Unknown",
            count: item.count,
            percent: formatPercent(item.count),
        }));

        res.status(200).json({
            Countries: formatData(result.Countries, true),
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

        const { range } = req.query;
        const { currentStart, now } = parseRangeBounds(range);

        const visitorEnvironments = await TrackedData.aggregate([
            { $match: { websiteId: objectId, createdAt: { $gte: currentStart, $lte: now } } },
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
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ],
                    OS: [
                        { $group: { _id: "$os", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $project: { _id: 0, name: "$_id", count: 1 } }
                    ],
                    Devices: [
                        { $group: { _id: "$device", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
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

exports.getHeatmapData = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user.id;

        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) return res.status(404).json({ message: "Website not found or unauthorized" });

        const objectId = new mongoose.Types.ObjectId(websiteId);

        const { range } = req.query;
        const { currentStart, now } = parseRangeBounds(range);

        const heatmapStats = await TrackedData.aggregate([
            {
                $match: {
                    websiteId: objectId,
                    createdAt: { $gte: currentStart, $lte: now }
                }
            },
            {
                $group: {
                    // $dayOfWeek returns 1 (Sunday) to 7 (Saturday)
                    // $hour returns 0-23
                    _id: {
                        day: { $dayOfWeek: "$createdAt" },
                        hour: { $hour: "$createdAt" }
                    },
                    uniqueVisitors: { $addToSet: "$visitorId" }
                }
            },
            {
                $project: {
                    _id: 0,
                    day: "$_id.day",
                    hour: "$_id.hour",
                    visitors: { $size: "$uniqueVisitors" }
                }
            }
        ]);

        // Initialize a 7x24 matrix with 0s
        // indices 0-6 (Sun-Sat), 0-23 (hours)
        const formatData = Array.from({ length: 7 }, () => Array(24).fill(0));

        // Map the results into the matrix
        heatmapStats.forEach(stat => {
            // $dayOfWeek is 1-indexed (1=Sunday), subtract 1 for 0-indexed JS array
            const dayIndex = stat.day - 1;
            const hourIndex = stat.hour;

            formatData[dayIndex][hourIndex] = stat.visitors;
        });

        res.status(200).json(formatData);

    } catch (error) {
        console.error("Heatmap Data Error:", error);
        res.status(500).json({ message: "Failed to fetch heatmap data" });
    }
};

exports.getSourcesMetrics = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user.id;

        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) return res.status(404).json({ message: "Website not found or unauthorized" });

        const objectId = new mongoose.Types.ObjectId(websiteId);

        const { range } = req.query;
        const { currentStart, now } = parseRangeBounds(range);

        // Group by sessionId to get the first referrer of each session
        const sessionSources = await TrackedData.aggregate([
            { $match: { websiteId: objectId, createdAt: { $gte: currentStart, $lte: now } } },
            { $sort: { createdAt: 1 } },
            {
                $group: {
                    _id: "$sessionId",
                    referrer: { $first: "$referrer" }
                }
            }
        ]);

        // Process in JS to handle domains and "Direct"
        const sourceCounts = {};
        let totalSessions = 0;

        sessionSources.forEach(session => {
            totalSessions++;
            let source = "Direct";
            if (session.referrer && session.referrer !== "Direct") {
                try {
                    const url = new URL(session.referrer);
                    if (url.hostname !== website.domain && url.hostname !== "localhost") {
                        source = url.hostname.replace(/^www\./, "");
                    }
                } catch (e) {
                    // Invalid URL, keep as Direct or original
                    source = session.referrer;
                }
            }
            sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        });

        // Convert to array and sort
        const sourcesArray = Object.keys(sourceCounts).map(name => ({
            name,
            count: sourceCounts[name]
        })).sort((a, b) => b.count - a.count);

        // Calculate percentages
        const formatPercent = (count) => totalSessions > 0 ? `${Math.round((count / totalSessions) * 100)}%` : "0%";

        const formattedData = sourcesArray.map(item => ({
            ...item,
            percent: formatPercent(item.count)
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Sources Metrics Error:", error);
        res.status(500).json({ message: "Failed to fetch sources metrics" });
    }
};

exports.getPagesMetrics = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user.id;

        const website = await Website.findOne({ _id: websiteId, userId });
        if (!website) return res.status(404).json({ message: "Website not found or unauthorized" });

        const objectId = new mongoose.Types.ObjectId(websiteId);

        const { range } = req.query;
        const { currentStart, now } = parseRangeBounds(range);

        // Helper to extract path
        const getPath = (fullUrl) => {
            try {
                const url = new URL(fullUrl);
                return url.pathname;
            } catch (e) {
                return fullUrl;
            }
        };

        // 1. Top Paths (most pageviews)
        const pathStats = await TrackedData.aggregate([
            { $match: { websiteId: objectId, event: "pageview", createdAt: { $gte: currentStart, $lte: now } } },
            { $group: { _id: "$url", count: { $sum: 1 } } }
        ]);

        let totalViews = 0;
        const pathCounts = {};
        pathStats.forEach(stat => {
            totalViews += stat.count;
            const p = getPath(stat._id);
            pathCounts[p] = (pathCounts[p] || 0) + stat.count;
        });

        const topPaths = Object.keys(pathCounts).map(path => ({
            path,
            count: pathCounts[path]
        })).sort((a, b) => b.count - a.count);

        const formatPathPercent = (count) => totalViews > 0 ? `${Math.round((count / totalViews) * 100)}%` : "0%";
        const formattedPaths = topPaths.map(item => ({ ...item, percent: formatPathPercent(item.count) }));

        // 2. Entry and Exit Pages
        const sessionPages = await TrackedData.aggregate([
            { $match: { websiteId: objectId, event: "pageview", createdAt: { $gte: currentStart, $lte: now } } },
            { $sort: { createdAt: 1 } },
            {
                $group: {
                    _id: "$sessionId",
                    entryUrl: { $first: "$url" },
                    exitUrl: { $last: "$url" }
                }
            }
        ]);

        let totalSessions = 0;
        const entryCounts = {};
        const exitCounts = {};

        sessionPages.forEach(session => {
            totalSessions++;
            const entryPath = getPath(session.entryUrl);
            const exitPath = getPath(session.exitUrl);
            entryCounts[entryPath] = (entryCounts[entryPath] || 0) + 1;
            exitCounts[exitPath] = (exitCounts[exitPath] || 0) + 1;
        });

        const topEntries = Object.keys(entryCounts).map(path => ({ path, count: entryCounts[path] }))
            .sort((a, b) => b.count - a.count);

        const topExits = Object.keys(exitCounts).map(path => ({ path, count: exitCounts[path] }))
            .sort((a, b) => b.count - a.count);

        const formatSessionPercent = (count) => totalSessions > 0 ? `${Math.round((count / totalSessions) * 100)}%` : "0%";

        const formattedEntries = topEntries.map(item => ({ ...item, percent: formatSessionPercent(item.count) }));
        const formattedExits = topExits.map(item => ({ ...item, percent: formatSessionPercent(item.count) }));

        res.status(200).json({
            Path: formattedPaths,
            Entry: formattedEntries,
            Exit: formattedExits
        });

    } catch (error) {
        console.error("Pages Metrics Error:", error);
        res.status(500).json({ message: "Failed to fetch pages metrics" });
    }
};
