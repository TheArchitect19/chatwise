const commentService = require('../services/commentService');

const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await commentService.addComment(postId, userId, content);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getCommentsForPost(postId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addComment, getCommentsForPost };
