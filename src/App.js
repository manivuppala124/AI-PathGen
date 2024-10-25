// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestScreen from './components/TestScreen';
import Path from './components/Path';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:courseName" element={<Quiz />} />
        <Route path="/path/:courseName/:level" element={<Path />} />
      </Routes>
    </Router>
  );
}

export default App;
