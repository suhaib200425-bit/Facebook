const User = require("../../models/user");

const acceptFollowRequest = async (req, res) => {
  try {
    const myId = req.user.id;          // Logged in user
    const requesterId = req.params.id; // Person who sent request

    // 1️⃣ Check if request exists
    const me = await User.findById(myId);

    if (!me.requests.includes(requesterId)) {
      return res.json({ status: false, message: "No follow request found" });
    }

    // 2️⃣ Remove from requests & add to followers
    await User.findByIdAndUpdate(myId, {
      $pull: { requests: requesterId },     // remove from requests
      $addToSet: { followers: requesterId } // add to followers
    });

    // 3️⃣ Add myId to their followings
    await User.findByIdAndUpdate(requesterId, {
      $addToSet: { followings: myId }
    });

    res.json({ status: true, message: "Follow request accepted" });

  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};


module.exports = { acceptFollowRequest };