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

// 2. Open CORS for Tracking (Script & Collection)
const trackingCors = cors({
  origin: "*",
  optionsSuccessStatus: 200,
});

// --- 1. GLOBAL MIDDLEWARE ---
app.use(express.json());
app.use(cookieParser());

// --- 2. HIGH PRIORITY: TRACKING ROUTES (MUST BE FIRST) ---
app.use("/scripts", trackingCors, express.static("./scripts"));
app.use("/api/track", trackingCors, require("./routes/trackerRoute"));

// --- 3. DASHBOARD CORS ---
const dashboardCors = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.toLowerCase().replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS (Origin not in allowed list):", origin);
      // Passing (null, false) tells the CORS middleware to reject but not crash
      callback(null, false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // Important for legacy browsers & some proxies
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
});

// Apply Dashboard CORS to all remaining routes handles OPTIONS and requests
app.use(dashboardCors);

// --- 4. DASHBOARD ROUTES ---
app.use("/api/auth", authRoute);
app.use("/api/website", verifyToken, websiteRoute);

app.get("/api/test", verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Test route is working!", user });
});

module.exports = app;
