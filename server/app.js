const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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

module.exports = app;
