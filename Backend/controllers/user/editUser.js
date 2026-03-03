
const User = require("../../models/user.js");

const EditUser = async (req, res) => {
    try {
        const UserId=req.user.id
        const {firstName,lastName,dateOfBirth}=req.body
        const user = await User.findById(UserId).select("-password");
        if (!user) {
            return res.json({
                status: false,
                message: "User Is Not Logged",
            });
        }
        const profilePic = req.files.profilePic
            ? `/uploads/${req.files.profilePic[0].filename}`
            : user.profilePic;

        const coverPic = req.files.coverPic
            ? `/uploads/${req.files.coverPic[0].filename}`
            : user.coverPic;

        const updatedUser = await User.findByIdAndUpdate(
            UserId,
            {
                firstName,
                lastName,
                dateOfBirth,
                profilePic,
                coverPic
            },
            { new: true } // return updated document
        );
        res.json({
            status: true,
            message: "User Updated",
            user: updatedUser, // password already removed
        });
    } catch (error) {
        
        res.json({
            status: false,
            message: "Server error",
            error:error.message
        });
    }
}

module.exports = { EditUser };