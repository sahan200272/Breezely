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
                email: newUser.email,
                familiarHand: newUser.familiarHand
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const updateUser = async (req, res) => {

    try {

        //extract id from request parameters
        const { id } = req.params;

        //extract data from request body
        const { name, email, familiarHand, password } = req.body;

        //set extracted data to object
        const data = {
            name: name,
            emial: email,
            familiarHand: familiarHand,
            password: password
        } 

        //find existing user and update it with new data
        const updatedUser = await User.findByIdAndUpdate(
            id,
            data,
            { new: true } // return updated data
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                familiarHand: updatedUser.familiarHand
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating user",
            error: error.message
        });
    }
}

module.exports = { registerUser, updateUser };
