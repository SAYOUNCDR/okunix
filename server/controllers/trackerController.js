const TrackedData = require("../models/trackedDataModal");
const Website = require("../models/websiteModal");
const requestIp = require("request-ip");
const UAParser = require("ua-parser-js");
const Reader = require("@maxmind/geoip2-node").Reader;
const path = require("path");

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
    const { websiteId, url, referrer, width, height, sessionId, visitorId, event } = req.body;

    if (!websiteId) {
      return res.status(400).json({ message: "Website ID is required" });
    }

    const website = await Website.findOne({ websiteId });
    if (!website) {
      return res.status(404).json({ message: "Invalid Website ID" });
    }

    const clientIp = requestIp.getClientIp(req);

    const uaString = req.headers["user-agent"];
    const parser = new UAParser(uaString);
    const result = parser.getResult();
    const browser = result.browser.name || "Unknown";
    const os = result.os.name || "Unknown";
    const device = result.device.type || "Desktop";

    let country = "Unknown";
    let region = "Unknown";
    let city = "Unknown";

    if (cityReader && clientIp) {
      try {
        if (
          clientIp === "::1" ||
          clientIp === "127.0.0.1" ||
          clientIp.includes("192.168.") ||
          clientIp.startsWith("10.")
        ) {
          country = "Local";
          region = "Local";
          city = "Local";
        } else {
          const response = cityReader.city(clientIp);

          if (response) {
            country =
              (response.country &&
                response.country.names &&
                response.country.names.en) ||
              "Unknown";

            if (response.subdivisions && response.subdivisions.length > 0) {
              region =
                (response.subdivisions[0].names &&
                  response.subdivisions[0].names.en) ||
                "Unknown";
            }

            city =
              (response.city &&
                response.city.names &&
                response.city.names.en) ||
              "Unknown";
          }
        }
      } catch (geoErr) {
        console.warn(`Geo lookup notice for IP ${clientIp}:`, geoErr.message);
      }
    }

    const newData = {
      websiteId: website._id,
      url,
      referrer: referrer || "Direct",
      country,
      region,
      city,
      sessionId,
      visitorId,
      event: event || "pageview",
      browser,
      os,
      device: device,
    };

    await TrackedData.create(newData);

    return res.status(200).json({ message: "Data tracked successfully" });
  } catch (error) {
    console.error("--- TRACKING ERROR DETAIL ---");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Body:", req.body);
    console.error("-----------------------------");
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
