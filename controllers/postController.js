const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content, visibility } = req.body;
    const post = await postService.createPost(userId, content, visibility);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFeed = async (req, res) => {
  try {
    const userId = req.user.id;
    const feed = await postService.getFeed(userId);
    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPost, getFeed };
