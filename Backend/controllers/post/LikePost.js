const Post = require('../../models/post')

const LikePost = async (req, res) => {
    try {
        const PostId = req.params.id
        let isLiked = false
        let UpdatePost={}
        const target = await Post.findById(PostId).select("likes");
        console.log(target);
        
        if (target.likes.includes(req.user.id)) {
            UpdatePost=await Post.findByIdAndUpdate(PostId, {
                $pull: { likes: req.user.id }
            });
            isLiked = false
        } else {
            UpdatePost=await Post.findByIdAndUpdate(PostId, {
                $push: { likes: req.user.id }
            });
            isLiked = true
        }
        res.json({
            status: true,
            isLiked,
            UpdatePost,
            message:'Updated'
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Server Error',
            error: error.message
        });
    }
}


module.exports = { LikePost };