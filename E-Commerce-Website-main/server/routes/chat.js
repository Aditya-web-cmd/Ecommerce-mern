const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/chatController');

// POST - Send message to chatbot
router.post('/', sendMessage);

module.exports = router;
