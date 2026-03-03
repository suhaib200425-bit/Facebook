const Post = require("../../models/post");

const createPost = async (req, res) => {
    try {
        const { caption, contentType } = req.body;
        const UserId = req.user.id
        const media = req.file?`/uploads/${req.file.filename}`:'';
        // Validate contentType
        if (!["text", "image", "video"].includes(contentType)) {
            return res.status(400).json({
                status: false,
                message: "Invalid content type",
            });
        }

        const newPost = new Post({
            user: UserId,
            caption,
            media,
            contentType,
        });

        await newPost.save();

        res.json({
            status: true,
            message: "Post uploaded statusfully",
            data: newPost,
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
};

module.exports = { createPost };