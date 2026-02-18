import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      // Even if no token in storage, we might have a valid httpOnly cookie refresh token
      // So try to fetch user or refresh token
      try {
        if (!token) {
          // Try to refresh token first if no access token
          await api.post("/auth/refresh-token").then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
          });
        }

        // Fetch user details
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        // If anything fails (no cookie, invalid token), user is not logged in
        setUser(null);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    // Store access token in memory/localStorage (for this session)
    localStorage.setItem("accessToken", accessToken);
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
      // You might want a logout endpoint in backend to clear cookies
      // await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
