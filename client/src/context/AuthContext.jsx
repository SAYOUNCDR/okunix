import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAccessToken } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Memory is wiped on refresh so we always try to refresh token first using cookie
      try {
        const refreshResponse = await api.post("/auth/refresh-token");
        const accessToken = refreshResponse.data.accessToken;
        setAccessToken(accessToken);

        // Fetch user details
        const response = await api.get("/auth/me");
        // Ensure we handle response structure correctly: assume API returns { user: ... }
        setUser(response.data.user || response.data);
      } catch (error) {
        // If anything fails (no cookie, invalid token), user is not logged in
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    // Store access token in memory
    setAccessToken(accessToken);
    setUser(user);
    return user;
  };

  const register = async (username, email, password) => {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const changeEmail = async (newEmail, password) => {
    const response = await api.post("/auth/change-email", {
      newEmail,
      password,
    });
    return response.data;
  };

  const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  };

  const resetPassword = async (token, password) => {
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    changeEmail,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
