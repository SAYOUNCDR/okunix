const rateLimit = require("express-rate-limit");

const rateLimiter = (windowMs, max) => {
    return rateLimit({
        windowMs,
        max,
        message: "Too many requests from this IP, please try again later.",
    });
};

module.exports = rateLimiter;
