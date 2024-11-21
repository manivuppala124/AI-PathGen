import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Path from "./components/Path";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound"; // Add this for handling 404 errors
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* The Navbar will be visible on all routes */}
      <Routes>
        {/* Define the main routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:courseName" element={<Quiz />} />
        <Route path="/path/:courseName/:level" element={<Path />} />
        
        {/* Add Login and Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
