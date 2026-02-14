const TrackedData = require("../models/trackedDataModal");
const Website = require("../models/websiteModal");
const requestIp = require("request-ip");
const UAParser = require("ua-parser-js");
const Reader = require("@maxmind/geoip2-node").Reader;
const path = require("path");

// Function to open the Geo database
let cityReader = null;
const dbPath = path.join(__dirname, "../geo/GeoLite2-City.mmdb");

Reader.open(dbPath)
  .then((reader) => {
    cityReader = reader;
    console.log("GeoLite2 Database Loaded");
  })
  .catch((err) => {
    console.error("Failed to load GeoLite2 Database:", err);
  });

exports.collectData = async (req, res) => {
  try {
    const { websiteId, url, referrer, width, height, sessionId } = req.body;

    if (!websiteId) {
      return res.status(400).json({ message: "Website ID is required" });
    }

    // Validate Website exists
    // Note: For high traffic, you might want to cache valid website IDs in Redis/Memory
    const website = await Website.findOne({ websiteId });
    if (!website) {
      return res.status(404).json({ message: "Invalid Website ID" });
    }

    // 1. Get IP Address
    const clientIp = requestIp.getClientIp(req);

    // DEBUG: Log IP debugging info to help troubleshoot Nginx/Proxy issues
    // console.log("DEBUG IP: ClientIP:", clientIp, "X-Forwarded-For:", req.headers['x-forwarded-for'], "RemoteAddress:", req.connection.remoteAddress);

    // 2. Parse User Agent
    const uaString = req.headers["user-agent"];
    const parser = new UAParser(uaString);
    const result = parser.getResult();
    const browser = result.browser.name || "Unknown";
    const os = result.os.name || "Unknown";
    const device = result.device.type || "Desktop"; // Default to Desktop if undefined (mobile/tablet usually detected)

    // 3. Geo Location (using MaxMind)
    let country = "Unknown";
    let region = "Unknown";
    let city = "Unknown";

    if (cityReader && clientIp) {
      try {
        // Handle localhost / private IPs gracefully
        if (clientIp === "::1" || clientIp === "127.0.0.1") {
          country = "Local";
          region = "Local";
          city = "Local";
        } else {
          const response = cityReader.city(clientIp);
          country = response.country.names.en || "Unknown";
          region =
            response.subdivisions && response.subdivisions.length > 0
              ? response.subdivisions[0].names.en
              : "Unknown";
          city = response.city.names.en || "Unknown";
        }
      } catch (geoErr) {
        // IP not found in DB or invalid
        console.warn(`Geo lookup failed for IP ${clientIp}:`, geoErr.message);
      }
    }

    // 4. Save to DB
    await TrackedData.create({
      websiteId: website._id,
      url,
      referrer,
      country,
      region,
      city,
      sessionId,
      browser,
      os,
      device: device,
      // You might want to store screen resolution too if you add it to the schema
    });

    // Respond with a simple 200 OK (or even 204 No Content for speed)
    return res.status(200).json({ message: "Data tracked successfully" });
  } catch (error) {
    console.error("Tracking Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
