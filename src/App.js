import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Updated path
import LearnPage from './components/LearnPage'; // Updated path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn/:courseName" element={<LearnPage />} />
      </Routes>
    </Router>
  );
};

export default App;
