const mongoose = require("mongoose");

const trackedDataSchema = new mongoose.Schema(
    {
        websiteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",
            required: true,
        },
        url: { type: String, required: true },
        referrer: { type: String, default: "" },
        country: { type: String, default: "Unknown" },
        region: { type: String, default: "Unknown" },
        city: { type: String, default: "Unknown" },
        sessionId: { type: String, required: true },
        visitorId: { type: String, required: true }, // The 10-year persistent token
        event: {
            type: String,
            enum: ["pageview", "leave", "custom"],
            default: "pageview",
            required: true
        },
        browser: String,
        os: String,
        device: String,
    },
    { timestamps: true }
);


const TrackedData = mongoose.model("TrackedData", trackedDataSchema);
module.exports = TrackedData;