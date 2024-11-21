const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/feed', authMiddleware, postController.getFeed);

module.exports = router;
