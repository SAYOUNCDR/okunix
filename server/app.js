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
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.APP_URL,
  "https://okunix.sayoun.studio",
  "https://okunix.tech",
  "http://localhost:5173",
]
  .filter(Boolean)
  .map((url) => url.toLowerCase().replace(/\/$/, "")); // Normalize: Lowercase & No Trailing Slashes

const dashboardCors = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.toLowerCase().replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // Fix for legacy browsers & some proxy issues
});

// 2. Open CORS for Tracking (Script & Collection)
const trackingCors = cors({ origin: "*" });

app.use(express.json());
app.use(cookieParser());

// --- 1. HANDLING PRE-FLIGHTS (Critical for Proxies) ---

// Handle Tracking pre-flights first (Open)
app.options("/api/track/*", trackingCors);
app.options("/scripts/*", trackingCors);

// Handle Dashboard pre-flights (Strict)
app.options("/api/auth/*", dashboardCors);
app.options("/api/website/*", dashboardCors);

// --- 2. MOUNTING ROUTES ---

// Open routes (Scripts & Data Collection)
app.use("/scripts", trackingCors, express.static("./scripts"));
app.use("/api/track", trackingCors, require("./routes/trackerRoute"));

// Strict routes (Dashboard)
app.use("/api/auth", dashboardCors, authRoute);
app.use("/api/website", dashboardCors, verifyToken, websiteRoute);

app.get("/api/test", verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Test route is working!", user });
});

module.exports = app;
