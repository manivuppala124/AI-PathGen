import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage'; 
import DashboardQuizPage from './components/DashboardQuizPage'; 
import Quiz from './components/Quiz'; 
import Path from './components/path';
import NotFound from './components/NotFound';
import './App.css';
import ChatButton from './components/ChatButton';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="/dashboard" element={<DashboardQuizPage />} />  
                <Route path="/quiz/:courseName" element={<Quiz />} /> 
                {/* <Route path="/quizWithDashboard/:courseName" element={<QuizWithDashboard />} /> */}
                <Route path="/path/:courseName/:level" element={<Path />} />
                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatButton/>
        </Router>
    );
}

export default App;
