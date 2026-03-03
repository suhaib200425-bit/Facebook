const Post = require("../../models/post");
const Comment = require("../../models/comment")
const getallPosts = async (req, res) => {
  try {
    // Query params
    const page = parseInt(req.query.page) || 1;   // current page
    const limit = parseInt(req.query.limit) || 5; // posts per page
    const UserId = req.user.id
    const skip = (page - 1) * limit;


    // Total count
    // const totalPosts = await Post.countDocuments();

    // Get paginated posts
    const posts = await Post.find()
      // 👇 User details populate
      .populate("user", "_id firstName profilePic")
      // 👇 Likes users populate (optional)
      .populate("likes", "_id firstName profilePic")
      .sort({ createdAt: -1 })  // latest first
      .skip(skip)
      .limit(limit);

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
      posts: likedPosts
    });

  } catch (error) {
    res.json({
      status: false,
      message: error.message
    });
  }
};

module.exports = { getallPosts };