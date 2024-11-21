const userService = require('../services/userService');

const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.params;
    await userService.sendFriendRequest(senderId, receiverId);
    res.status(200).json({ message: 'Friend request sent' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { senderId } = req.params;
    await userService.acceptFriendRequest(userId, senderId);
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { sendFriendRequest, acceptFriendRequest };
