const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Check missing fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                "message": "User Not Found"
            })
        }
        else {

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(404).json({
                    "message": "Invalid Password",
                })
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )

            return res.status(200).json({
                "message": "User Found",
                token
            });
        }
    } catch (error) {
        res.status(500).json({
            "message": "Server Error",
            "error": error.message
        })
    }
}

module.exports = { loginUser };