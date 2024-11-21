const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/friend-request/:receiverId', authMiddleware, userController.sendFriendRequest);
router.post('/accept-request/:senderId', authMiddleware, userController.acceptFriendRequest);

module.exports = router;
