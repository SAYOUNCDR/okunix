const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const websiteSchema = new mongoose.Schema(
    {
        websiteName: {
            type: String,
            required: true,
        },
        domain: {
            type: String,
            required: true,
        },
        website_id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
    },
    { timestamps: true },
);

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
