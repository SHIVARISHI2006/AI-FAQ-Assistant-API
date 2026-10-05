const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateFAQService = async (topic) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `Act as an expert technical writer. Generate a comprehensive FAQ based on the topic: "${topic}". 
  Format your response strictly as a JSON object with the following keys: 
  "generatedQuestion" (a clear, common user question), 
  "generatedAnswer" (a detailed, helpful answer), 
  "generatedCategory" (a single descriptive category word).`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const aiText = response.text();
  
  const jsonMatch = aiText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
      throw new Error('Failed to parse AI output into JSON schema.');
  }

  return JSON.parse(jsonMatch[0]);
};

module.exports = { generateFAQService };