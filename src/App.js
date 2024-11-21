import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Path from "./components/Path";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";
import ContactUS from "./components/ContactUS";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound"; // For 404 errors
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar visible on all routes */}
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:courseName" element={<Quiz />} />
        <Route path="/path/:courseName/:level" element={<Path />} />
        <Route path="/contactus" element={<ContactUS />} /> {/* Fixed path */}
        
        {/* Login and Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 Not Found fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
