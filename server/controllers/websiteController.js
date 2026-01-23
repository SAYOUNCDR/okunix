const Website = require("../models/websiteModal");
const TrackedData = require("../models/trackedDataModal");

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

exports.deleteWebsite = async (req, res) => {
    const _id = req.params.websiteId;
    const userId = req.user.userId;
    const website = await Website.findOne({ _id, userId });
    if (!website) {
        return res.status(404).json({ message: "Website not found" });
    }
    await website.deleteOne();
    res.status(200).json({ message: "Website deleted successfully" });
}

exports.getTrackedData = async (req, res) => {
    const websiteId = req.params.websiteId;
    // Find website by its UUID (public ID)
    const website = await Website.findOne({ websiteId });
    if (!website) {
        return res.status(404).json({ message: "Website not found" });
    }
    // Query TrackedData using the internal ObjectId (_id) of the website
    const trackedData = await TrackedData.find({ websiteId: website._id });
    res.status(200).json({ message: "Tracked data fetched successfully", trackedData });
}

exports.getTrackingScript = async (req, res) => {
    const _id = req.params.websiteId;
    // In a real env, use process.env.BASE_URL
    const baseUrl = req.protocol + '://' + req.get('host');
    const scriptTag = `<script src="${baseUrl}/scripts/tracker.js" data-website-id="${_id}"></script>`;

    res.status(200).json({
        message: "Script generated successfully",
        script: scriptTag,
        instructions: "Copy the 'script' tag and paste it into the <head> of your website."
    });
}
