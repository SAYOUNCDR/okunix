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
        browser: String,
        os: String,
        device: String,
    },
    { timestamps: true }
);


const TrackedData = mongoose.model("TrackedData", trackedDataSchema);
module.exports = TrackedData;