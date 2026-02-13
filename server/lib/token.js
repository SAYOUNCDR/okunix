const jwt = require("jsonwebtoken");

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

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken };
