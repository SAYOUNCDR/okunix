const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const verifyToken = require("./middleware/authMiddleware");
const websiteRoute = require("./routes/websiteRoute");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get("/test", (req, res) => {
  res
    .status(200)
    .json({ message: "Server is running and test route is working!" });
});

// Routes
app.use("/api/auth", authRoute); 


// Protected routes
// 1. Create webstite route
app.use("/api/website", websiteRoute);

// Testing auth middleware route
app.get("/api/test", verifyToken, (req, res) => {
    res.status(200).json({ message: "Test route is working!" });
});

module.exports = app;
