const User = require("../models/user.model");

const registerUser = async (req, res) => {
    try {
        const { name, email, familiarHand, password } = req.body;

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new user document
        const newUser = new User({
            name,
            email,
            familiarHand,
            password
        });

        // Save to DB
        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser };
