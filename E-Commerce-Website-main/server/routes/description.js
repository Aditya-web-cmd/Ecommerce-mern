const express = require('express');
const router = express.Router();
const { generateDescription } = require('../controllers/descriptionController');

// POST - Generate product description
router.post('/', generateDescription);

module.exports = router;
