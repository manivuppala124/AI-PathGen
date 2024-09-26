import React, { useState, useEffect } from 'react';
import jsMind from 'jsmind';
import 'jsmind/style/jsmind.css'; // Import jsMind CSS

const COHERE_API_KEY = '4DXFsPiFWGRBusJhGMRWSw6VO848SKbliQ09CCz0';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

const MindMap = () => {
  const [inputText, setInputText] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mindMapData, setMindMapData] = useState(null);

  const handleModelResponse = async () => {
    if (!inputText || !courseLevel) return;

    try {
      setIsTyping(true);

      const promptPreamble = `
      You are a highly knowledgeable AI that assists students in learning various subjects by creating personalized learning paths based on their existing knowledge, goals, and preferences. 
      The learning path should be structured in a step-by-step manner, starting from the basics and gradually advancing toward more complex concepts. 
      For each topic, include recommended learning resources such as articles, tutorials, and videos. 
      Consider the learner's pace, preferred learning style (e.g., visual, auditory, or hands-on), and any specific goals they have mentioned.

      Please generate a learning path for the following course:

      Course: ${inputText}
      Current Knowledge Level: ${courseLevel}
      Goal: become proficient in ${inputText}
      Learning Style Preference: [Insert learning style preference if applicable, e.g., hands-on practice, theory-based, etc.]

      Ensure the path is logical and builds upon the learner's existing knowledge.
      `;

      const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${COHERE_API_KEY}`,
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

      // Parse the botText to mind map
      const parsedData = parseTextToMindMap(botText.trim());
      const mindMapFormat = {
        meta: {
          name: 'Learning Path Mind Map',
          author: 'Cohere AI + jsMind',
          version: '0.2',
        },
        format: 'node_tree',
        data: parsedData,
      };

      setMindMapData(mindMapFormat);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to parse the Cohere-generated text into mind map data format
  const parseTextToMindMap = (text) => {
    const topics = text.trim().split(',');
    const root = {
      id: 'root',
      isroot: true,
      topic: 'Learning Path',
      children: [],
    };

    topics.forEach((topic, i) => {
      const topicNode = {
        id: `topic_${i}`,
        topic: topic.trim(),
        children: [],
      };
      root.children.push(topicNode);
    });

    return root;
  };

  // Render the mind map
  useEffect(() => {
    if (mindMapData) {
      const options = {
        container: 'jsmind_container',
        editable: false, // Prevent editing for now
        theme: 'primary', // Choose a theme for styling
      };

      const mind = jsMind.show(options, mindMapData); // Display the mind map

      // Clean up when the component unmounts
      return () => {
        mind.destroy();
      };
    }
  }, [mindMapData]);

  return (
    <div>
      <h1>Mind Map</h1>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter the course name"
        />
        <input
          type="text"
          value={courseLevel}
          onChange={(e) => setCourseLevel(e.target.value)}
          placeholder="Enter your knowledge level (e.g., beginner, intermediate, advanced)"
        />
        <button onClick={handleModelResponse}>
          {isTyping ? 'Generating...' : 'Generate Learning Path'}
        </button>
      </div>
      <div
        id="jsmind_container"
        style={{ width: '100vw', height: '500vh', border: '1px solid #ccc' }}
      ></div>
    </div>
  );
};

export default MindMap;
