const Post = require('../../models/post')
const Comment = require('../../models/comment')

const getPostComment = async (req, res) => {
    try {
        const PostId = req.params.id
        const post = await Post.findById(PostId)
            .populate("user", "firstName profilePic") // only firstName & profilePic
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const comments = await Comment.find({ post: PostId })
            .populate("user", "firstName profilePic") // only firstName & profilePic
            .sort({ createdAt: -1 }) // latest first
            .skip(skip)
            .limit(limit);

        const totalComments = await Comment.countDocuments({ post: PostId });

        res.json({
            status: true,
            currentPage: page,
            totalPages: Math.ceil(totalComments / limit),
            totalComments,
            comments,
            post
        });

    } catch (error) {
        res.json({
            status: false,
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = { getPostComment };