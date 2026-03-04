import api from "./api";

/**
 * Fetch top-level dashboard statistics (Visitors, Visits, Views, Bounce Rate, Duration)
 */
export const getDashboardStats = async (websiteId, range = "24h") => {
    try {
        const response = await api.get(`/analytics/stats/${websiteId}?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch analytics stats:", error);
        throw error;
    }
};

/**
 * Fetch daily aggregation chart data for the last 7 days
 */
export const getActivityChart = async (websiteId, range = "24h", filter = "Day") => {
    try {
        const response = await api.get(`/analytics/chart/${websiteId}?range=${range}&filter=${filter}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch analytics chart:", error);
        throw error;
    }
};

/**
 * Fetch location metrics (Countries, Regions, Cities)
 */
export const getLocationMetrics = async (websiteId, range = "24h") => {
    try {
        const response = await api.get(`/analytics/location/${websiteId}?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch location analytics:", error);
        throw error;
    }
};

/**
 * Fetch environment metrics (Browsers, OS, Devices)
 */
export const getEnvironmentMetrics = async (websiteId, range = "24h") => {
    try {
        const response = await api.get(`/analytics/environment/${websiteId}?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch environment analytics:", error);
        throw error;
    }
};

/**
 * Fetch traffic heatmap logic (returning default 7x24 arrays natively)
 */
export const getHeatmapData = async (websiteId, range = "24h") => {
    try {
        const response = await api.get(`/analytics/heatmap/${websiteId}?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch heatmap data:", error);
        throw error;
    }
};

/**
 * Fetch sources (referrers) metrics
 */
export const getSourcesMetrics = async (websiteId, range = "24h") => {
    try {
        const response = await api.get(`/analytics/sources/${websiteId}?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch sources metrics:", error);
        throw error;
    }
};

/**
 * Fetch top paths, entry pages, and exit pages
 */
export const getPagesMetrics = async (websiteId, range = "24h") => {
    try {
        const response = await api.get(`/analytics/pages/${websiteId}?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch pages metrics:", error);
        throw error;
    }
};
