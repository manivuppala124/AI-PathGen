import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestScreen from './components/TestScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:courseName" element={<TestScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
