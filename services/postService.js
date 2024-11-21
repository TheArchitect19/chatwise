const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const createPost = async (userId, content, visibility = 'friends-only') => {
  const post = new Post({ userId, content, visibility });
  await post.save();
  return post;
};

const getFeed = async (userId) => {
  const user = await User.findById(userId).populate('friends');
  const friendIds = user.friends.map((friend) => friend._id);

  // Fetch posts created by friends
  const friendPosts = await Post.find({ userId: { $in: friendIds } });

  // Fetch posts where friends have commented
  const commentedPosts = await Post.find({
    _id: {
      $in: await Comment.find({ userId: { $in: friendIds } }).distinct('postId'),
    },
  });

  // Merge and remove duplicates
  const feed = [...new Set([...friendPosts, ...commentedPosts])];
  return feed;
};

module.exports = { createPost, getFeed };
