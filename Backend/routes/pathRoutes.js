const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');  // You will need to install node-fetch

const COHERE_API_KEY = 'AexcEiRB0FyK6MEZiiZOqlu77T4S3L4FOqAkMGAH';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

// Route to get learning path
router.get('/generate', async (req, res) => {
  const { courseName, level } = req.query; // Get courseName and level from query parameters

  if (!courseName || !level) {
    return res.status(400).json({ error: 'Course name and level are required' });
  }

  const prompt = `
    You are an AI that generates personalized learning paths. Create a learning path for a ${level} student in ${courseName}.
    The learning path should contain 5-7 key stages with each stage as a concise heading.
    Use a simple format like:
    1. First topic
    2. Second topic
    3. Third topic
  `;

  try {
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.generations[0]?.text.trim();

    if (generatedText) {
      const pathArray = generatedText
        .split('\n')
        .filter((line) => line.match(/^\d+/))
        .map((step) => step.replace(/^\d+\.\s*/, '').split(':')[0].trim());
      return res.json({ learningPath: pathArray });
    } else {
      return res.status(500).json({ error: 'Failed to generate learning path' });
    }
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
