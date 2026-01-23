const Website = require("../models/websiteModal");

exports.createWebsite = async (req, res) => {
    const { websiteName, domain } = req.body;
    const userId = req.user.userId;

    try {
        if (!websiteName || !domain) {
            return res.status(400).json({ message: "Website name and domain are required" });
        }
        const website = await Website.findOne({ websiteName, domain });
        if (website) {
            return res.status(400).json({ message: "Website already exists" });
        }
        const newWebsite = await Website.create({ websiteName, domain, userId });
        res.status(201).json({ message: "Website created successfully", newWebsite });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.getUserWebsites = async (req, res) => {
    const userId = req.user.userId;
    const websites = await Website.find({ userId });
    res.status(200).json({ message: "All websites fetched successfully", websites });
}

exports.getWebsite = async (req, res) => {
    const _id = req.params.websiteId;
    const userId = req.user.userId;
    const website = await Website.findOne({ _id, userId });
    if (!website) {
        return res.status(404).json({ message: "Website not found" });
    }
    res.status(200).json({ message: "Website fetched successfully", website });
}