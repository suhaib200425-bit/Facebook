const Post = require("../../models/post");

const profilePost = async (req, res) => {
    try {
        // Query params
        const page = parseInt(req.query.page) || 1;   // current page
        const limit = parseInt(req.query.limit) || 5; // posts per page
        const profileId = req.params.id
        const skip = (page - 1) * limit;
        const UserId=req.user.id

        // Total count
        // const totalPosts = await Post.countDocuments();

        // Get paginated posts
        const posts = await Post.find(
            { user: profileId }
        )
            // 👇 User details populate
            .populate("user", "_id firstName profilePic")
            // 👇 Likes users populate (optional)
            .populate("likes", "_id firstName profilePic")
            .sort({ createdAt: -1 })  // latest first
            .skip(skip)
            .limit(limit);


        const photos = await Post.find(
            { user: profileId, contentType: 'image' }
        ).sort({ createdAt: -1 }).limit(6);
        console.log("???????????");
        console.log(photos);
        const likedPosts = posts.map(elem => {

            const isLiked = elem.likes.some(like => like._id !== UserId);

            if (isLiked) {
                return {
                    ...elem.toObject(),
                    isLiked: true
                }
            } else {
                return {
                    ...elem.toObject(),
                    isLiked: false
                }
            }

        })

        res.json({
            status: true,
            currentPage: page,
            //   totalPages: Math.ceil(totalPosts / limit),
            //   totalPosts,
            posts:likedPosts,
            photos
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};

module.exports = { profilePost };