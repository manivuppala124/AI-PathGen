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
      const prompt = `
        You are an AI designed to generate a performance-evaluating multiple-choice quiz.
        Create a quiz with 10 questions for the course: ${courseName}.
        Each question should assess key concepts from the course and increase in difficulty as the quiz progresses.
        Each question should have four options, and only one correct answer.
  
        Return the quiz strictly in JSON format, without any extra text or characters. The JSON structure should include each question as an object with "question" and "answers" (an array of options, each with "text" and "correct" flag).
      `;
  
      const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 2500,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const generatedText = data.generations[0]?.text.trim();
  
      if (!generatedText) {
        throw new Error('Empty quiz generated');
      }
  
      const parsedQuiz = safeParseQuiz(generatedText);
      setQuiz(parsedQuiz);
  
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setQuiz([]);
      setError('Failed to fetch quiz data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const safeParseQuiz = (text) => {
    try {
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
  
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No JSON structure found.');
      }
  
      let jsonString = text.slice(jsonStart, jsonEnd)
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') 
        .replace(/,\s*}/g, '}')                              
        .replace(/,\s*]/g, ']')                              
        .replace(/\s+/g, ' ')                                
        .replace(/(\r\n|\n|\r)/gm, '');                      
  
      const parsedQuestions = JSON.parse(jsonString);
  
      if (!Array.isArray(parsedQuestions)) {
        throw new Error('Parsed quiz is not an array.');
      }
  
      // Filter questions with exactly four options and set them correctly
      return parsedQuestions
        .filter((question) => question.answers && question.answers.length === 4)
        .map((question) => ({
          question: question.question,
          options: question.answers
        }));
    } catch (error) {
      console.error('Error parsing quiz:', error);
      return [];
    }
  };
  
  

  const handleAnswerChange = (selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (userAnswers[currentQuestionIndex] == null) {
      setError("Please select an answer before proceeding.");
    } else {
      setError(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (userAnswers[currentQuestionIndex] == null) {
      setError("Please select an answer before submitting.");
    } else {
      let calculatedScore = 0;

      quiz.forEach((q, index) => {
        const correctAnswer = q.options.find(option => option.correct);
        if (userAnswers[index] === correctAnswer.text) {
          calculatedScore++;
        }
      });

      setScore(calculatedScore);

      let level = '';
      console.log(calculatedScore);
      if (calculatedScore <= 4) {
        level = 'beginner';
      } else if (calculatedScore <= 7) {
        level = 'intermediate';
      } else {
        level = 'advanced';
      }

      navigate(`/path/${courseName}/${level}`);
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
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <>
          {error && <p className="error text-center text-danger">{error}</p>}
          {quiz.length > 0 && currentQuestionIndex < quiz.length ? (
            <div className="quiz-question mb-5 p-3 border rounded">
              <h5 className="question-title">Question {currentQuestionIndex + 1} of {quiz.length}</h5>
              <h6>{quiz[currentQuestionIndex].question}</h6>
              <div className="options-list">
                {quiz[currentQuestionIndex].options.map((option, optIndex) => (
                  <div key={optIndex} className="form-check option-item mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      id={`question-${currentQuestionIndex}-option-${optIndex}`}
                      value={option.text}
                      onChange={() => handleAnswerChange(option.text)}
                      checked={userAnswers[currentQuestionIndex] === option.text}
                    />
                    <label className="form-check-label" htmlFor={`question-${currentQuestionIndex}-option-${optIndex}`}>
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">No quiz available. Please try again.</p>
          )}

<div className="text-center">
  {currentQuestionIndex > 0 && (
    <button className="btn btn-secondary btn-md me-2" onClick={handleBack}>
      Back
    </button>
  )}
  {currentQuestionIndex < quiz.length - 1 ? (
    <button className="btn btn-primary btn-md" onClick={handleNext}>
      Next
    </button>
  ) : (
    <button className="btn btn-success btn-md" onClick={handleSubmit}>
      Submit
    </button>
  )}
</div>

          {score !== null && (
            <div className="alert alert-info text-center mt-4">
              Your score: {score} / {quiz.length}
              <div className="mt-3">
                <button className="btn btn-warning" onClick={handleReattempt}>
                  Reattempt Quiz
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
