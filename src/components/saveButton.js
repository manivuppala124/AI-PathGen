import React, { useState } from 'react';
import axios from 'axios';

const SaveButton = ({ courseName, level, learningPath, quizResult }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const saveLearningPath = async () => {
    if (learningPath.length === 0) {
      setError('No learning path to save.');
      return;
    }

    setIsSaving(true);
    setError(null); // Clear any previous error
    setSuccessMessage(null); // Clear previous success message

    const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage after login

    try {
      const response = await axios.post(
        'http://localhost:4000/api/path/save', // API endpoint to save the learning path
        {
          token: token,
          courseName: courseName,
          level: level,
          path: learningPath,
          quizResult: quizResult, // Include quiz result if available
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );

      if (response) {
        setSuccessMessage('Learning path saved successfully!');
      }
    } catch (error) {
      setError('Failed to save the learning path. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="text-center mt-4">
      {isSaving ? (
        <button className="btn btn-primary" disabled>
          Saving...
        </button>
      ) : (
        <button className="btn btn-success me-2" onClick={saveLearningPath}>
          Save Learning Path
        </button>
      )}

      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
    </div>
  );
};

export default SaveButton;
