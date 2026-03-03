
const Post = require('../../models/post')
const Comment = require('../../models/comment')

const SentComment = async (req, res) => {
    try {
        const PostId = req.params.id
        let comment = await Comment.create(
            {
                post: PostId,
                user: req.user.id,
                text: req.body.text
            }
        )
        await Post.findByIdAndUpdate(
            PostId,
            { $push: { comments: comment._id } }
        );
        comment = await Comment.find()
            .populate("user", "username profilePic") // only username & profilePic

        res.json({
            status: true,
            comment
        });

    } catch (error) {
        res.json({
            status: false,
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = { SentComment };