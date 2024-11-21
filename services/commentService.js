const Comment = require('../models/comment');
const Post = require('../models/post');

const addComment = async (postId, userId, content) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');

  const comment = new Comment({ postId, userId, content });
  await comment.save();

  post.comments.push(comment._id);
  await post.save();

  return comment;
};

const getCommentsForPost = async (postId) => {
  const comments = await Comment.find({ postId }).populate('userId', 'username name');
  return comments;
};

module.exports = { addComment, getCommentsForPost };
