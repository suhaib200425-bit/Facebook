const User = require("../../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender
        } = req.body;

        // 🔎 Validate required fields
        if (!firstName || !email || !password) {
            return res.json({
                status: false,
                message: "⚠️ Required fields are missing"
            });
        }

        // 📧 Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                status: false,
                message: "❌ Email already registered"
            });
        }

        // 🔐 Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 👤 Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth,
            gender
        });

        // 🚫 Remove password from response
        const userResponse = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            dateOfBirth: newUser.dateOfBirth,
            gender: newUser.gender
        };

        res.json({
            status: true,
            message: "✅ User registered successfully",
            user: userResponse
        });

    } catch (error) {
        res.json({
            status: false,
            message: "❌ " + error.message
        });
    }
};

module.exports = { registerUser };