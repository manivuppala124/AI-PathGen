import React, { useState } from 'react';
import ChatScreen from './TestScreen'; // Import the ChatScreen component
import MindMap from './MindMap'; // Import the MindMap component

const MainScreen = () => {
  const [mindMapText, setMindMapText] = useState(''); // State to hold text for mind map

  // Function to receive the generated text from ChatScreen and pass it to MindMap
  const handleGeneratedText = (text) => {
    setMindMapText(text); // Update the mind map text with the generated text
  };

  return (
    <div>
      <h1>Chat to Mind Map Generator</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {/* ChatScreen component with a callback to handle generated text */}
        <ChatScreen onTextGenerated={handleGeneratedText} />

        {/* MindMap component with text input as prop */}
        <MindMap inputText={mindMapText} />
      </div>
    </div>
  );
};

export default MainScreen;