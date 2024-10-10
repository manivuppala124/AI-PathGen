import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MindMap from './MindMap'; // Import the MindMap component

const LearnPage = () => {
  const { courseName } = useParams();

  return (
    <div className="container mt-5">
      <h1 className="text-center">Learning Path for: {courseName}</h1>
      <MindMap courseName={courseName} /> {/* Pass courseName to MindMap */}
    </div>
  );
};

export default LearnPage;
