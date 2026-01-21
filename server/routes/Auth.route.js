const express = require("express");
const User = require("../models/Users.model");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body; 

        if(!username ||!email ||!password){
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Convert to object and remove password
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "User registered successfully",
            user: userResponse,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate refresh and access tokens
        const accessToken = jwt.sign(
            { userId: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "15m" }
        );
        
        const refreshToken = jwt.sign(
            { userId: user._id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: "7d" }
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV !== 'development', // HTTPS only in production
            sameSite: 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
1
    
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }

        res.status(200).json({
            message: "User logged in successfully",
            user: userResponse,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }   
})


router.post("/refresh-token", (req, res) => {
    try {
        const cookie = req.cookies.jwt;
        if(!cookie){
            return res.status(400).json({ message: "No refresh token found" });
        }

        const decoded = jwt.verify(cookie, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign(
            { userId: decoded.userId }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "15m" }
        );
        res.json({ accessToken });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;