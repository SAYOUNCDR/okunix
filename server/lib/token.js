const jwt = require("jsonwebtoken");
const { id } = require("zod/v4/locales");

const generateAccessToken = (userId, role, tokenVersion) => {
  const payload = {
    id: userId,
    role,
    tokenVersion,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId, tokenVersion) => {
  const payload = {
    id: userId,
    tokenVersion,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
