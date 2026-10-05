const { generateFAQService } = require('../services/geminiService');

const generateFAQ = async (req, res, next) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      res.status(400);
      throw new Error('Please provide a topic for generation');
    }
    
    const generatedData = await generateFAQService(topic);
    res.json({ topic, ...generatedData, generatedAt: new Date() });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateFAQ };