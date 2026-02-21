const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

router.get("/verify-email", authController.verifyEmail);

router.get("/me", verifyToken, authController.getMe);

router.delete("/delete-account", verifyToken, authController.deleteAccount);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

router.post("/change-email", verifyToken, authController.changeEmail);

module.exports = router;
