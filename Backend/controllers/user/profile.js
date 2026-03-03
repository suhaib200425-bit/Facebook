const User = require('../../models/user')
const ProfileUser = async (req, res) => {
  try {

    if (!req.params.id && !req.user) {
      return res.json({
        status: false,
        message: "Unauthorized",
      });
    }
    const UserId = req.user.id
    const ID = req.params.id || req.user.id;

    let user = await User.findById(ID)
      .select("-password")
      .populate("followers", "firstName lastName profilePic")
      .populate("followings", "firstName lastName profilePic")
      .populate("requests", "firstName lastName profilePic");



    // Convert ObjectId to string for comparison
    const isFollowed = user.followers.some(
      follower => follower._id.toString() === UserId.toString()
    );

    const isRequested = user.requests.some(
      request => request._id.toString() === UserId.toString()
    );
    if (!user) {
      return res.json({
        status: false,
        message: "User not found",
      });
    }

    res.json({
      status: true,
      message: "User fetched successfully",
      user: {
        ...user.toObject(),
        followed: isFollowed,
        request: isRequested
      },
    });

  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};


module.exports = { ProfileUser };