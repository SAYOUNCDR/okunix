const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const rateLimiter = require("../middleware/rateLimiter");

// Strict Limiter: 15 minutes, Max 10 attempts
const authLimiter = rateLimiter(15 * 60 * 1000, 10);

router.post("/register", authLimiter, authController.register);

router.post("/login", authLimiter, authController.login);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

router.get("/verify-email", authController.verifyEmail);

router.get("/me", verifyToken, authController.getMe);

router.delete("/delete-account", verifyToken, authController.deleteAccount);

router.post("/forgot-password", authLimiter, authController.forgotPassword);

router.post("/reset-password", authLimiter, authController.resetPassword);

router.post("/change-email", verifyToken, authLimiter, authController.changeEmail);

module.exports = router;
