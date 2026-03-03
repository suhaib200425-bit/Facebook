const User = require("../../models/user");

const getallUser = async (req, res) => {
    try {
        // Query params
        const page = parseInt(req.query.page) || 1;   // current page
        const limit = parseInt(req.query.limit) || 10; // posts per page
        const loggedUserId = req.user.id
        const skip = (page - 1) * limit;

        // Total count
        // const totalPosts = await Post.countDocuments();

        // Get paginated posts
        let Users = await User.find(
            {
                _id: { $ne: loggedUserId }   // not equal to logged user
            }
        )
            .populate("followers", "firstName lastName profilePic")
            .populate("followings", "firstName lastName profilePic")
            .populate("requests", "firstName lastName profilePic")
            .sort({ createdAt: -1 })  // latest first
            .skip(skip)
            .limit(limit);
    
        res.json({
        status: true,
        currentPage: page,
        //   totalPages: Math.ceil(totalPosts / limit),
        //   totalPosts,
        data: Users
    });

} catch (error) {
    res.json({
        status: false,
        message: error.message
    });
}
};

module.exports = { getallUser };