const User = require('../../models/user')

const sendRequest = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const senderUserId = req.user.id;
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) {
            return res.json({ status: false, message: "User not found" });
        }

        // 1️⃣ If already follower → remove follower
        if (targetUser.followers.includes(senderUserId)) {
            await User.findByIdAndUpdate(targetUserId, {
                $pull: { followers: senderUserId }
            });

            return res.json({
                status: true,
                user: {
                    ...targetUser.toObject(),
                    followed: false,
                    request: false
                }, message: "Removed from followers"
            });
        }

        // 2️⃣ If already requested → cancel request
        if (targetUser.requests.includes(senderUserId)) {
            await User.findByIdAndUpdate(targetUserId, {
                $pull: { requests: senderUserId }
            });

            return res.json({
                status: true,
                user: {
                    ...targetUser.toObject(),
                    followed: false,
                    request: false
                }, message: "Request cancelled"
            });
        }

        // 3️⃣ Else → send new request
        await User.findByIdAndUpdate(targetUserId, {
            $push: { requests: senderUserId }
        });

        res.json({
            status: true,
            user: {
                ...targetUser.toObject(),
                followed: false,
                request: true
            }, message: "Request sent"
        });

    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

module.exports = { sendRequest };