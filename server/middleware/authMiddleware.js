const { request } = require("express");
const { verifyAccessToken } = require("../lib/token");
const User = require("../models/userModal");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1]; // this comes as Bearer <token> in btw space
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      const payload = verifyAccessToken(token);
      if (!payload) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      const user = await User.findById(payload.id);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      if (user.tokenVersion != payload?.tokenVersion) {
        return res
          .status(401)
          .json({ message: "Token is expired! Please login again" });
      }

      const authUser = req;
      authUser.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      };
      next();
    } catch (error) {
      console.error("Token Verification Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifyToken;
