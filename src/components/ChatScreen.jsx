import React, { useState, useEffect, useRef } from 'react';
import './ChatScreen.css';

const COHERE_API_KEY = 'AexcEiRB0FyK6MEZiiZOqlu77T4S3L4FOqAkMGAH';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';
const COHERE_SUMMARIZE_URL = 'https://api.cohere.ai/v1/summarize';

function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState(() => {
    // Load the conversation from local storage when the component mounts
    const savedConversation = localStorage.getItem('conversation');
    return savedConversation ? JSON.parse(savedConversation) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
    // Save the conversation to local storage whenever it changes
    localStorage.setItem('conversation', JSON.stringify(conversation));
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const summarizeText = async (text) => {
    try {
      const response = await fetch(COHERE_SUMMARIZE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          length: 'short',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.summary) {
        throw new Error('Invalid response format');
      }

      return data.summary;
    } catch (error) {
      console.error('Error summarizing data:', error);
      return text;
    }
  };

  const handleCohereResponse = async (messageText) => {
    try {
      setIsTyping(true);
      const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: messageText,
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

      botText = await summarizeText(botText.trim());

      const botMessage = {
        id: Date.now(),
        sender: 'bot',
        text: botText,
      };
      setConversation((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = {
        id: Date.now(),
        sender: 'bot',
        text: 'Error fetching data. Please try again later.',
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
    };
    setConversation((prev) => [...prev, userMessage]);
    setInputText('');
    handleCohereResponse(userMessage.text);
  };

  const handleClearChat = () => {
    setConversation([]);
    localStorage.removeItem('conversation'); // Clear from local storage
  };

  return (
    <div className="chat-popup">
      <div className="chat-container">
        <header className="chat-header">
          <h4>Chat Assistant</h4>
          <button className="clear-chat-button" onClick={handleClearChat}>
            Clear Chat
          </button>
        </header>
        <div className="chat-box">
          {conversation.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
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
            placeholder="Type your message here..."
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
