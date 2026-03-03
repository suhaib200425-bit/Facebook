const User = require("../../models/user");

const RequestUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get only requests array
    const user = await User.findById(userId).select("requests");

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const totalRequests = user.requests.length;

    // Paginated IDs
    const requestIds = user.requests.slice(skip, skip + limit);

    // Get full user data
    const requestUsers = await User.find({
      _id: { $in: requestIds }
    }).select("firstName lastName profilePic bio");

    res.json({
      status: true,
      currentPage: page,
      totalPages: Math.ceil(totalRequests / limit),
      totalRequests,
      message:'Requst Users',
      data: requestUsers
    });

  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
module.exports = { RequestUsers };