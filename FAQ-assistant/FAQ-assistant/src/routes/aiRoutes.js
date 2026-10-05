const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { generateFAQ } = require('../controllers/aiController');

const router = express.Router();

router.post('/generate-faq', protect, generateFAQ);

module.exports = router;