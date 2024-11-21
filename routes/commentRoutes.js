const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/:postId', authMiddleware, commentController.addComment);
router.get('/:postId', authMiddleware, commentController.getCommentsForPost);

module.exports = router;
