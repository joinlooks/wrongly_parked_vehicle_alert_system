const User = require("../models/user"); // Assuming User model is defined in 'user.js'
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, phone, password, isAdmin } = req.body;
        // Check if user already exists
        let existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        let existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }
        // Create new user
        const newUser = new User({
            username,
            phone,
            isAdmin,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASS_SEC
            ).toString(),
        });
        await newUser.save();
        return res
            .status(201)
            .json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const OriginalPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        ).toString(CryptoJS.enc.Utf8);
        // Check password
        if (OriginalPassword !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        return res
            .status(200)
            .json({ message: "Login successful", user, accessToken });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed as a route parameter
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed as a route parameter
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res
            .status(200)
            .json({ message: "User profile updated successfully", user });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
