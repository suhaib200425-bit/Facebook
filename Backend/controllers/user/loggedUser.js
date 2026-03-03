
const User = require("../../models/user.js");

const loggedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password")
            .populate("followers", "firstName lastName profilePic")
            .populate("followings", "firstName lastName profilePic")
            .populate("requests", "firstName lastName profilePic");
        if (!user) {
            return res.json({
                status: false,
                message: "User Is Not Logged",
            });
        }

        res.json({
            status: true,
            message: "User is logged in",
            user: user, // password already removed
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Server error",
        });
    }
}

module.exports = { loggedUser };