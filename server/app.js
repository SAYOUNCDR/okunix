const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const verifyToken = require("./middleware/authMiddleware");
const websiteRoute = require("./routes/websiteRoute");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

app.use("/api/auth", authRoute);
app.use("/api/track", require("./routes/trackerRoute"));
app.use("/scripts", express.static("./scripts")); // Serve tracker.js

app.use("/api/website", verifyToken, websiteRoute);

app.get("/api/test", verifyToken, (req, res) => {
    const user = req.user;
    res.status(200).json({ message: "Test route is working!", user });
});

module.exports = app;
