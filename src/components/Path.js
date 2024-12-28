import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Path.css';
import SaveButton from './saveButton';

function Path() {
  const { courseName, level } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [learningPath, setLearningPath] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [expandedStepIndex, setExpandedStepIndex] = useState(null); // State to manage expanded description

  const fetchLearningPath = useCallback(async () => {
    setIsLoading(true);

    try {
      const cachedPath = localStorage.getItem(`learningPath_${courseName}_${level}`);
      if (cachedPath) {
        const parsedPath = JSON.parse(cachedPath);
        setLearningPath(parsedPath);
        setIsLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:4000/api/path/generate?courseName=${courseName}&level=${level}`);
      if (!response.ok) {
        throw new Error('Failed to fetch learning path');
      }
      const data = await response.json();
      setLearningPath(data.learningPath || []);
      localStorage.setItem(`learningPath_${courseName}_${level}`, JSON.stringify(data.learningPath));
    } catch (error) {
      console.error('Error fetching learning path:', error);
    } finally {
      setIsLoading(false);
    }
  }, [courseName, level]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const retrievedScore = queryParams.get('score');
    setScore(retrievedScore);

    fetchLearningPath();
  }, [courseName, level, location.search, fetchLearningPath]);

  const saveLearningPath = () => {
    if (learningPath.length > 0) {
      alert('Learning path saved successfully!');
    } else {
      alert('No learning path to save.');
    }
  };

  const regenerateLearningPath = async () => {
    localStorage.removeItem(`learningPath_${courseName}_${level}`);
    await fetchLearningPath();
  };

  const handleToggleDescription = (index) => {
    setExpandedStepIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the description visibility
  };

  const renderFlowChart = () => {
    return learningPath.map((step, index) => (
      <div key={index} className="flowchart-step mb-4 text-center">
        <div className="flowchart-box">
          <h5
            className="flowchart-heading"
            onClick={() => handleToggleDescription(index)} // Add click handler
            style={{
              cursor: 'pointer',
              color: '#fff', // White font color
              backgroundColor: '#6a11cb', // Optional: Background color for better visibility
              padding: '10px',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          >
            {step.heading}
          </h5>
          {expandedStepIndex === index && (
            <p className="flowchart-description">{step.description}</p> // Show description if expanded
          )}
        </div>
        {index < learningPath.length - 1 && <div className="flowchart-arrow" style={{ padding: '10px' }}>↓</div>}
      </div>
    ));
  };

  return (
    <div
      className="path-wrapper"
      style={{
        background: 'linear-gradient(to bottom, #6a11cb, #2575fc)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <div
        className="path-container p-4"
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          color: '#333',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#6a11cb' }}>
          Learning Path for {courseName}
        </h2>
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
          <div className="text-center mt-4 d-flex justify-content-center align-items-center">
            <SaveButton
              className="btn btn-success me-2" // Updated consistent class
              courseName={courseName}
              level={level}
              learningPath={learningPath}
            />
            <button className="btn btn-warning me-2" onClick={regenerateLearningPath}>
              Regenerate Learning Path
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/dashboard`)}>
              Start Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Path;
