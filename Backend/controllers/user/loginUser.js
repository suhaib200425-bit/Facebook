const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                status: false,
                message: "User not found",
            });
        }

        // 2️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user
            .password);

        if (!isMatch) {
            return res.json({
                status: false,
                message: "Invalid password",
            });
        }

        // 3️⃣ Create JWT Token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWTSECRETKEY,
            { expiresIn: "1d" }
        );

        res.json({
            status: true,
            message: "Login successful",
            token,
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
};


module.exports = { loginUser };