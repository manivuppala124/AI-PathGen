import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const COHERE_API_KEY = '4DXFsPiFWGRBusJhGMRWSw6VO848SKbliQ09CCz0';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

function Path() {
  const { courseName, level } = useParams();
  const location = useLocation();
  const [learningPath, setLearningPath] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Retrieve the score passed from the Quiz page if available
    const queryParams = new URLSearchParams(location.search);
    const retrievedScore = queryParams.get('score');
    setScore(retrievedScore);

    const fetchLearningPath = async () => {
      setIsLoading(true);
      const prompt = `
        You are an AI that generates personalized learning paths. Create a learning path for a ${level} student in ${courseName}.
        The learning path should contain 5-7 key stages, with each stage building on the previous one.
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
            'Authorization': `Bearer ${COHERE_API_KEY}`,
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
        const pathArray = generatedText.split('\n')
          .filter(line => line.match(/^\d+/))
          .map(step => step.replace(/^\d+\.\s*/, '').replace(/:$/, '')); // Remove trailing colons

        setLearningPath(pathArray);

      } catch (error) {
        console.error('Error fetching learning path:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseName && level) {
      fetchLearningPath();
    }
  }, [courseName, level, location.search]);

  const renderFlowChart = () => {
    return learningPath.map((step, index) => (
      <div key={index} className="flowchart-step mb-3 text-center">
        <div className="flowchart-box p-3 bg-primary text-white rounded">
          {step}
        </div>
        {index < learningPath.length - 1 && (
          <div className="flowchart-arrow my-2">
            ↓
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Learning Path for {courseName}</h2>
      <h4 className="text-center">Level: {level.charAt(0).toUpperCase() + level.slice(1)}</h4>
      {score && (
        <div className="text-center alert alert-info">
          Your Score: {score} / {learningPath.length}
        </div>
      )}

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="flowchart-container d-flex flex-column align-items-center">
          {learningPath.length > 0 ? renderFlowChart() : <p>No learning path available</p>}
        </div>
      )}

      {learningPath.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary">Start Learning</button>
        </div>
      )}
    </div>
  );
}

export default Path;
