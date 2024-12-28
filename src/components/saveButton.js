import React, { useState } from 'react';
import axios from 'axios';

const SaveButton = ({ courseName,level, learningPath, quizResult }) => {
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
console.log(learningPath);
console.log(token);
console.log(level);
console.log(quizResult);
console.log(courseName);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/path/save', // Endpoint to save data
        {
          token:token,
          courseName: courseName, // Add actual course name dynamically if needed
          level: level, // Add actual level dynamically if needed
          path: learningPath,
          // quizResult: quizResult, // Pass the quiz result (score)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Sending the JWT token in the Authorization header
          },
        }
      );
      //console.log(token);
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
        <button className="btn btn-success" onClick={saveLearningPath}>
          Save Learning Path
        </button>
      )}

      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
    </div>
  );
};

export default SaveButton;
