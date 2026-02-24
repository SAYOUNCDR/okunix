const Website = require("../models/websiteModal");
const TrackedData = require("../models/trackedDataModal");

exports.createWebsite = async (req, res) => {
  const { websiteName, domain } = req.body;
  const userId = req.user.id;

  try {
    if (!websiteName || !domain) {
      return res
        .status(400)
        .json({ message: "Website name and domain are required" });
    }
    const existingWebsite = await Website.findOne({
      $or: [{ websiteName }, { domain }],
    });

    if (existingWebsite) {
      const message =
        existingWebsite.domain === domain
          ? "Domain already registered"
          : "Website name already exists";
      return res.status(400).json({ message });
    }

    const newWebsite = await Website.create({ websiteName, domain, userId });
    res
      .status(201)
      .json({ message: "Website created successfully", newWebsite });
  } catch (error) {
    console.error("Create Website Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserWebsites = async (req, res) => {
  const userId = req.user.id;
  const websites = await Website.find({ userId });
  res
    .status(200)
    .json({ message: "All websites fetched successfully", websites });
};

exports.getWebsite = async (req, res) => {
  const _id = req.params.websiteId;
  const userId = req.user.id;
  const website = await Website.findOne({ _id, userId });
  if (!website) {
    return res.status(404).json({ message: "Website not found" });
  }
  res.status(200).json({ message: "Website fetched successfully", website });
};

exports.updateWebsite = async (req, res) => {
  const _id = req.params.websiteId;
  const userId = req.user.id;
  try {
    const { websiteName, domain } = req.body;
    const website = await Website.findOne({ _id, userId });
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    if (websiteName) {
      const existingName = await Website.findOne({
        websiteName,
        _id: { $ne: _id },
      });
      if (existingName) {
        return res.status(400).json({ message: "Website name already exists" });
      }
    }
    if (domain) {
      const existingDomain = await Website.findOne({
        domain,
        _id: { $ne: _id },
      });
      if (existingDomain) {
        return res.status(400).json({ message: "Domain already registered" });
      }
    }

    const updatedWebsite = await Website.findByIdAndUpdate(
      _id,
      { websiteName, domain },
      { new: true },
    );
    res
      .status(200)
      .json({ message: "Website updated successfully", updatedWebsite });
  } catch (error) {
    console.error("Update Website Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteWebsite = async (req, res) => {
  try {
    const _id = req.params.websiteId;
    const userId = req.user.id;
    const website = await Website.findOne({ _id, userId });
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    // Delete all tracked data associated with this website
    await TrackedData.deleteMany({ websiteId: website._id });
    await website.deleteOne();
    res.status(200).json({ message: "Website deleted successfully" });
  } catch (error) {
    console.error("Delete Website Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetWebsite = async (req, res) => {
  try {
    const _id = req.params.websiteId;
    const userId = req.user.id;
    const website = await Website.findOne({ _id, userId });
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    // Delete all tracked data associated with this website
    await TrackedData.deleteMany({ websiteId: website._id });
    res.status(200).json({ message: "Website data reset successfully" });
  } catch (error) {
    console.error("Reset Website Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTrackedData = async (req, res) => {
  const websiteId = req.params.websiteId;
  // Find website by its UUID (public ID)
  const website = await Website.findOne({ websiteId });
  if (!website) {
    return res.status(404).json({ message: "Website not found" });
  }
  // Query TrackedData using the internal ObjectId (_id) of the website
  const trackedData = await TrackedData.find({ websiteId: website._id });
  res
    .status(200)
    .json({ message: "Tracked data fetched successfully", trackedData });
};

exports.getTrackingScript = async (req, res) => {
  const _id = req.params.websiteId;
  const userId = req.user.id;

  try {
    const website = await Website.findOne({ _id, userId });
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    // Use APP_URL from env for consistent production URLs (handling Nginx proxies correctly)
    const baseUrl =
      process.env.APP_URL || req.protocol + "://" + req.get("host");

    // The tracker script is served from /scripts/tracker.js as per app.js static config
    const scriptTag = `<script defer src="${baseUrl}/scripts/tracker.js" data-website-id="${website.websiteId}"></script>`;

    res.status(200).json({
      message: "Script generated successfully",
      script: scriptTag,
      instructions:
        "Copy the 'script' tag and paste it into the <head> of your website.",
    });
  } catch (error) {
    console.error("Get Tracking Script Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
