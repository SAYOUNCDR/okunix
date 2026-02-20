import api from "./api"; // Use the configured Axios instance

// Create a new website
export const createWebsite = async (websiteData) => {
  try {
    const response = await api.post("/website/createWebsite", websiteData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create website";
  }
};

// Get all websites for the logged-in user
export const getUserWebsites = async () => {
  try {
    const response = await api.get("/website/getUserWebsites");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch websites";
  }
};

// Get a specific website by ID
export const getWebsite = async (websiteId) => {
  try {
    const response = await api.get(`/website/getWebsite/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch website details";
  }
};

// Get tracked data for a website
export const getTrackedData = async (websiteId) => {
  try {
    const response = await api.get(`/website/getTrackedData/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch tracked data";
  }
};

// Get tracking script for a website
export const getTrackingScript = async (websiteId) => {
  try {
    const response = await api.get(`/website/getTrackingScript/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch tracking script";
  }
};

// Delete a website
export const deleteWebsite = async (websiteId) => {
  try {
    const response = await api.delete(`/website/deleteWebsite/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete website";
  }
};

export const resetWebsite = async (websiteId) => {
  try {
    const response = await api.delete(`/website/resetWebsite/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to reset website website";
  }
};

export const updateWebsite = async (websiteId, websiteData) => {
  try {
    const response = await api.put(
      `/website/updateWebsite/${websiteId}`,
      websiteData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update website";
  }
};
