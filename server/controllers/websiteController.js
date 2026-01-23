const Website = require("../models/websiteModal");

exports.createWebsite = async (req, res) => {
    const { websiteName, domain } = req.body;
    const userId = req.user.userId;

    const website = {
        websiteName,
        domain,
        userId,
    }

    const newWebsite = await Website.create(website);
    res.status(201).json({ message: "Website created successfully", newWebsite });
}

exports.getUserWebsites = async (req, res) => {
    const userId = req.user.userId;
    const websites = await Website.find({ userId });
    res.status(200).json({ message: "All websites fetched successfully", websites });
}