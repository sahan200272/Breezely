const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { name, email, familiarHand, password } = req.body;

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document
        const newUser = new User({
            name,
            email,
            familiarHand,
            password: hashedPassword
        });

        // Save to DB
        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                familiarHand: newUser.familiarHand,
                password: newUser.password
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
        let hashedPassword;

        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        //set extracted data to object
        const data = {
            name: name,
            emial: email,
            familiarHand: familiarHand,
            password: password
        }

        if (hashedPassword) {
            data.password = hashedPassword
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

const getAllUsers = async (req, res) => {

    try {
        const allUsers = await User.find();

        return res.status(200).json({
            message: "Get All users Success",
            users: allUsers
        })

    } catch (error) {
        res.status(400).json({
            message: "Server Error",
            error: error.message
        })
    }
}

const getUserByID = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        else {

            return res.status(200).json({
                message: "user access successfully",
                user: user
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Server Error",
            error: error.message
        });
    }
}

module.exports = { registerUser, updateUser, getAllUsers, getUserByID };