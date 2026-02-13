const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const verifyToken = require("./middleware/authMiddleware");
const websiteRoute = require("./routes/websiteRoute");
const app = express();

// Trust proxy is required when behind Nginx/Load Balancers so req.ip and request-ip work correctly
app.set("trust proxy", true);

// 1. Strict CORS for Dashboard (Login, Settings, Viewing Data)
const dashboardCors = cors({
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : "http://localhost:5173",
  credentials: true,
});

// 2. Open CORS for Tracking (Script & Collection)
const trackingCors = cors({ origin: "*" });

app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// Apply OPEN CORS to tracker script and collection endpoint
// NOTE: These MUST come before any strict CORS middleware
app.use("/scripts", trackingCors, express.static("./scripts"));
app.use("/api/track", trackingCors, require("./routes/trackerRoute"));

// Apply STRICT CORS to Dashboard routes
app.use("/api/auth", dashboardCors, authRoute);
app.use("/api/website", dashboardCors, verifyToken, websiteRoute);

app.get("/api/test", verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Test route is working!", user });
});

module.exports = app;
