import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Quiz.css';

const COHERE_API_KEY = "4DXFsPiFWGRBusJhGMRWSw6VO848SKbliQ09CCz0";
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

function Quiz() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const prompt = `
        You are an AI designed to generate a multiple-choice quiz.
        Create a quiz with 10 questions for the course: ${courseName}.
        Each question should have four options, and only one correct answer.
        Format the quiz strictly as a JSON array of objects with "question" and "answers" 
        (an array of options, each with "text" and "correct" flags).
      `;

      const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 1800,
          temperature: 0.5,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.generations[0]?.text.trim();

      if (!generatedText) {
        throw new Error('Empty quiz generated.');
      }

      const parsedQuiz = safeParseQuiz(generatedText);
      setQuiz(parsedQuiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('Failed to fetch quiz data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const safeParseQuiz = (text) => {
    try {
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('Invalid JSON format.');
      }

      const jsonString = text.slice(jsonStart, jsonEnd);

      const parsedQuestions = JSON.parse(jsonString);
      if (!Array.isArray(parsedQuestions)) {
        throw new Error('Parsed quiz is not an array.');
      }

      return parsedQuestions.map((q) => ({
        question: q.question,
        options: q.answers.map((answer) => ({
          text: answer.text,
          correct: answer.correct,
        })),
      }));
    } catch (error) {
      console.error('Error parsing quiz:', error);
      setError('Quiz data is corrupted. Please try again.');
      return [];
    }
  };

  const handleAnswerChange = (selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (userAnswers[currentQuestionIndex] == null) {
      setError('Please select an answer before proceeding.');
    } else {
      setError(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (userAnswers[currentQuestionIndex] == null) {
      setError('Please select an answer before submitting.');
    } else {
      const calculatedScore = quiz.reduce((acc, q, index) => {
        const correctAnswer = q.options.find((opt) => opt.correct).text;
        return acc + (userAnswers[index] === correctAnswer ? 1 : 0);
      }, 0);

      setScore(calculatedScore);
    }
  };

  const handleReattempt = () => {
    setUserAnswers({});
    setScore(null);
    setCurrentQuestionIndex(0);
  };

  useEffect(() => {
    if (courseName) {
      fetchQuiz();
    }
  }, [courseName]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Quiz for {courseName}</h2>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : score === null && quiz.length > 0 ? (
        <div className="quiz-container">
          <div className="question">
            <h5>Question {currentQuestionIndex + 1} of {quiz.length}</h5>
            <p>{quiz[currentQuestionIndex].question}</p>
            {quiz[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`q-${currentQuestionIndex}`}
                  id={`q-${currentQuestionIndex}-opt-${index}`}
                  value={option.text}
                  checked={userAnswers[currentQuestionIndex] === option.text}
                  onChange={() => handleAnswerChange(option.text)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`q-${currentQuestionIndex}-opt-${index}`}
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>
          <div className="navigation-buttons text-center">
            {currentQuestionIndex > 0 && (
              <button className="btn btn-secondary me-2" onClick={handleBack}>
                Back
              </button>
            )}
            {currentQuestionIndex < quiz.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : score !== null ? (
        <div className="result">
          <h3 className="text-center">Your Score: {score} / {quiz.length}</h3>
          <p className="text-center">
            Based on your score, your recommended learning path is ready.
          </p>
          <div className="text-center">
            <button
              className="btn btn-primary mt-3"
              onClick={() =>
                navigate(`/path/${courseName}/${score > 7 ? 'advanced' : score > 4 ? 'intermediate' : 'beginner'}`)
              }
            >
              View Learning Path
            </button>
            <button className="btn btn-warning mt-3 ms-3" onClick={handleReattempt}>
              Reattempt Quiz
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">No quiz available. Please try again later.</p>
      )}
    </div>
  );
}

export default Quiz;
