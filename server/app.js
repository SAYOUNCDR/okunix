const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const verifyToken = require("./middleware/authMiddleware");
const websiteRoute = require("./routes/websiteRoute");
const app = express();

// Trust proxy is required when behind Nginx/Load Balancers so req.ip and request-ip work correctly
app.set("trust proxy", true);

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // In local dev, allow localhost. In prod, check against permissible domains
    // For the tracking endpoint, we need to allow ALL origins, so we handle that specifically in the route
    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    // For Dashboard API calls, restrict to your frontend domain
    if (origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    } else {
      // For tracking requests, we might want to be permissive,
      // but the global middleware is usually strict for API.
      // We will use a loose CORS for the tracker route specifically.
      return callback(null, true); // Temporarily allow all for simplicity in mixed setup, strictly handle in routes if needed
    }
  },
  credentials: true, // Required for Cookies
};

// Global CORS (Restrictive by default in production)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  }),
);

// Specific CORS for Tracking (Must be open to everyone)
const trackingCors = cors({ origin: "*" });

app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// Apply open CORS to tracker script and collection endpoint
app.use("/scripts", trackingCors, express.static("./scripts"));
app.use("/api/track", trackingCors, require("./routes/trackerRoute"));

app.use("/api/auth", authRoute);

app.use("/api/website", verifyToken, websiteRoute);

app.get("/api/test", verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Test route is working!", user });
});

module.exports = app;
