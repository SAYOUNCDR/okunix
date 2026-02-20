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
].filter(Boolean); // Remove undefined/null values

const dashboardCors = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests) - Optional: remove if strict
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin); // Helpful for debugging on server logs
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
});

// TEMPORARY DEBUG: Allow ALL origins with credentials
// const dashboardCors = cors({
//   origin: true, // Reflects the request origin (effectively allowing all while keeping credentials working)
//   credentials: true, // Required for cookies
// });

// 2. Open CORS for Tracking (Script & Collection)
const trackingCors = cors({ origin: "*" });

app.use(express.json());
app.use(cookieParser());

// Handle Tracking pre-flights first (Allow all origins)
app.options("/api/track/*", trackingCors);
app.options("/scripts/*", trackingCors);

// ENABLE PRE-FLIGHT FOR DASHBOARD ROUTES (Critical for Nginx Proxy)
app.options(/(.*)/, dashboardCors);

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
