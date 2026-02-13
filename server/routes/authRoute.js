const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/refresh-token", authController.refreshToken);

router.get("/verify-email", authController.verifyEmail);

module.exports = router;
