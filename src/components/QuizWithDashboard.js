import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Quiz() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [filteredQuiz, setFilteredQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:4000/api/quiz/${courseName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched quiz data:', data);

      if (
        Array.isArray(data) &&
        data.every(
          (q) =>
            q.question &&
            Array.isArray(q.answers) &&
            q.answers.length > 0
        )
      ) {
        setQuiz(data);
        setFilteredQuiz(data); // Initialize with full quiz
      } else {
        throw new Error('Invalid quiz data format');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('Failed to fetch quiz data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      const filtered = quiz.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuiz(filtered);
    } else {
      setFilteredQuiz(quiz); // If search term is empty, show full quiz
    }
    setCurrentQuestionIndex(0); // Reset to first question after search
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
        const correctAnswer = q.answers.find(answer => answer.correct === true) || q.answers[0];
        return acc + (userAnswers[index] === correctAnswer.text ? 1 : 0);
      }, 0);
      setScore(calculatedScore);
    }
  };

  const handleReattempt = () => {
    setUserAnswers({});
    setScore(null);
    setCurrentQuestionIndex(0);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    if (courseName) {
      fetchQuiz();
    }
  }, [courseName]);

  return (
    <div
      className="quiz-wrapper"
      style={{
        background: 'linear-gradient(to bottom, #6a11cb, #2575fc)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <div
        className="quiz-container p-4"
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          color: '#333',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#6a11cb' }}>
          Quiz for {courseName}
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search question..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="btn btn-primary mt-2"
              style={{ width: '100%' }}
            >
              Search
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : score === null && filteredQuiz.length > 0 ? (
          <div>
            <div>
              <h4>
                Question {currentQuestionIndex + 1} of {filteredQuiz.length}
              </h4>
              <p>{filteredQuiz[currentQuestionIndex].question}</p>
            </div>
            {filteredQuiz[currentQuestionIndex].answers.map((option, index) => (
              <div key={index} className="form-check my-2">
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
            <div className="navigation-buttons text-center mt-3">
              {currentQuestionIndex > 0 && (
                <button className="btn btn-secondary me-2" onClick={handleBack}>
                  Back
                </button>
              )}
              {currentQuestionIndex < filteredQuiz.length - 1 ? (
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
          <div className="text-center">
            <h3 style={{ color: '#6a11cb' }}>Your Score: {score} / {filteredQuiz.length}</h3>
            <button className="btn btn-warning mt-3" onClick={handleReattempt}>
              Reattempt Quiz
            </button>
            <button className="btn btn-primary mt-3" onClick={handleGoToDashboard}>
              Go to Dashboard
            </button>
          </div>
        ) : (
          <p className="text-center">No quiz available. Please try again later.</p>
        )}
      </div>
    </div>
  );
}

export default Quiz;
