const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const COHERE_API_KEY = "OrdqKfDbrnezh41I0sptl7NT0OBaVjszTdqxIcme";
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

router.get('/:courseName', async (req, res) => {
  const { courseName } = req.params;

  const prompt = `
  You are an AI designed to generate a multiple-choice quiz.
  Create a quiz with 5 questions for the course: ${courseName}.
  Each question should have four options, and only one correct answer.
  Format the quiz strictly as a JSON array of objects with "question" and "answers" 
  (an array of options, each with "text" and "correct" flags).
  `;

  try {
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1800,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch quiz data.' });
    }

    const data = await response.json();
    const generatedText = data.generations[0]?.text.trim();

    if (!generatedText) {
      return res.status(500).json({ error: 'Empty quiz generated.' });
    }

    const jsonStart = generatedText.indexOf('[');
    const jsonEnd = generatedText.lastIndexOf(']') + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('Invalid JSON format.');
    }

    const quiz = JSON.parse(generatedText.slice(jsonStart, jsonEnd));
    res.json(quiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
}); 


module.exports = router;
