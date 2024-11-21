const User = require('../models/user');

const sendFriendRequest = async (senderId, receiverId) => {
  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);

  if (!receiver || !sender) throw new Error('User not found');
  if (receiver.friendRequests.received.includes(senderId)) throw new Error('Friend request already sent');

  receiver.friendRequests.received.push(senderId);
  sender.friendRequests.sent.push(receiverId);

  await receiver.save();
  await sender.save();
};

const acceptFriendRequest = async (userId, senderId) => {
  const user = await User.findById(userId);
  const sender = await User.findById(senderId);

  if (!user || !sender) throw new Error('User not found');
  if (!user.friendRequests.received.includes(senderId)) throw new Error('Friend request not found');

  user.friends.push(senderId);
  sender.friends.push(userId);

  user.friendRequests.received = user.friendRequests.received.filter((id) => id.toString() !== senderId);
  sender.friendRequests.sent = sender.friendRequests.sent.filter((id) => id.toString() !== userId);

  await user.save();
  await sender.save();
};

module.exports = { sendFriendRequest, acceptFriendRequest };
