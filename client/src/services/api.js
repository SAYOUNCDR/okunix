import axios from "axios";

// Ensure you have VITE_API_URL in your .env file or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// In-memory token storage (Secure against XSS logic)
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies (refreshToken)
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to get a new access token using the refresh token (cookie)
        const response = await api.post("/auth/refresh-token");
        const newAccessToken = response.data.accessToken;

        // Save new token in memory
        setAccessToken(newAccessToken);

        // Update authorization header and retry original request
        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear token
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
