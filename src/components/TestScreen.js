import React, { useState } from 'react';

const COHERE_API_KEY = '4DXFsPiFWGRBusJhGMRWSw6VO848SKbliQ09CCz0';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

function TestScreen({ onTextGenerated }) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleModelResponse = async (messageText) => {
    try {
      setIsTyping(true);

      // Set the preamble for the learning path generation
      const promptPreamble = `
      You are a highly knowledgeable AI that assists students in learning various subjects by creating personalized learning paths based on their existing knowledge, goals, and preferences. 
      The learning path should be structured in a step-by-step manner, starting from the basics and gradually advancing toward more complex concepts. 
      For each topic, include recommended learning resources such as articles, tutorials, and videos. 
      Consider the learner's pace, preferred learning style (e.g., visual, auditory, or hands-on), and any specific goals they have mentioned (e.g., becoming proficient in a particular programming language or mastering a specific framework).

      Please generate a learning path for the following course:

      Course: ${messageText}
      Current Knowledge Level: [Insert student's knowledge level, e.g., beginner, intermediate, or advanced]
      Goal: [Insert the student's goal, e.g., become proficient in front-end development]
      Learning Style Preference: [Insert learning style preference if applicable, e.g., hands-on practice, theory-based, etc.]

      Provide the steps in order and label them as 'Step 1,' 'Step 2,' etc. Ensure the path is logical and builds upon the learner's existing knowledge.
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
        botText = data.generations.map(generation => generation.text).join('\n');
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

    handleModelResponse(inputText);
    setInputText('');  // Clear the input after submitting
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        placeholder="Enter a course or topic to generate a learning path..."
      />
      <button onClick={handleSubmit}>Generate Learning Path</button>
      {isTyping && <p>Generating...</p>}
    </div>
  );
}

export default TestScreen;
