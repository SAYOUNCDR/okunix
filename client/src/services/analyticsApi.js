import api from "./api";

/**
 * Fetch top-level dashboard statistics (Visitors, Visits, Views, Bounce Rate, Duration)
 */
export const getDashboardStats = async (websiteId) => {
    try {
        const response = await api.get(`/analytics/stats/${websiteId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch analytics stats:", error);
        throw error;
    }
};

/**
 * Fetch daily aggregation chart data for the last 7 days
 */
export const getActivityChart = async (websiteId) => {
    try {
        const response = await api.get(`/analytics/chart/${websiteId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch analytics chart:", error);
        throw error;
    }
};

/**
 * Fetch location metrics (Countries, Regions, Cities)
 */
export const getLocationMetrics = async (websiteId) => {
    try {
        const response = await api.get(`/analytics/location/${websiteId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch location analytics:", error);
        throw error;
    }
};

/**
 * Fetch environment metrics (Browsers, OS, Devices)
 */
export const getEnvironmentMetrics = async (websiteId) => {
    try {
        const response = await api.get(`/analytics/environment/${websiteId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch environment analytics:", error);
        throw error;
    }
};

/**
 * Fetch traffic heatmap logic (returning default 7x24 arrays natively)
 */
export const getHeatmapData = async (websiteId) => {
    try {
        const response = await api.get(`/analytics/heatmap/${websiteId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch heatmap data:", error);
        throw error;
    }
};
