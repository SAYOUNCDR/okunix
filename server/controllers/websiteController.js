const Website = require("../models/websiteModal");


exports.createWebsite = async (req, res) => {
    const { websiteName, domain} = req.body;
    if(!websiteName || !domain){
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const website = await Website.create({
        websiteName,
        domain,
    });
    res.status(201).json({ message: "Website created successfully" });
}