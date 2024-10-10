import React, { useState } from 'react';

const COHERE_API_KEY = '4DXFsPiFWGRBusJhGMRWSw6VO848SKbliQ09CCz0';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

function TestScreen({ onTextGenerated }) {
  const [inputText, setInputText] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleModelResponse = async () => {
    try {
      setIsTyping(true);

      // Set the preamble for the learning path generation
      const promptPreamble = `
        You are a highly knowledgeable AI that assists students in learning various subjects by creating personalized learning paths based on their existing knowledge, goals, and preferences. 
        The learning path should be structured in a step-by-step manner, starting from the basics and gradually advancing toward more complex concepts. 
        For each topic, include recommended learning resources such as articles, tutorials, and videos. 
        Consider the learner's pace, preferred learning style (e.g., visual, auditory, or hands-on), and any specific goals they have mentioned.

        Please generate a learning path for the following course:

        Course: ${inputText}
        Current Knowledge Level: ${courseLevel}
        Goal: become proficient in ${inputText}
      `;

      const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: promptPreamble,
          max_tokens: 500,
          temperature: 0.7,
          stop_sequences: [],
          return_likelihoods: 'NONE',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let botText = '';

      if (Array.isArray(data.generations)) {
        botText = data.generations.map((generation) => generation.text).join('\n');
      } else {
        botText = data.response || 'Error fetching data. Please try again later.';
      }

      // Send the generated text to the parent component (MindMap in this case)
      onTextGenerated(botText.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = () => {
    if (!inputText.trim()) return;

    handleModelResponse();
    setInputText('');  // Clear the input after submitting
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a course or topic..."
      />
      <input
        type="text"
        value={courseLevel}
        onChange={(e) => setCourseLevel(e.target.value)}
        placeholder="Your knowledge level (e.g., beginner, intermediate)"
      />
      <button onClick={handleSubmit}>Generate Learning Path</button>
      {isTyping && <p>Generating...</p>}
    </div>
  );
}

export default TestScreen;
