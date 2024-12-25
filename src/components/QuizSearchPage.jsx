

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [courseSuggestions, setCourseSuggestions] = useState([]);
  const navigate = useNavigate();

  // Example course data (fetch from backend or use static)
  const allCourses = [
    // Full Stack Web Development
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'Angular', 'Vue.js', 'MongoDB', 'SQL', 'TypeScript', 'Bootstrap', 'Jest', 'GraphQL',
  
    // Data Science
    'Python', 'Pandas', 'Machine Learning', 'Deep Learning', 'Data Visualization', 'Data Analysis', 'Statistics', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'SQL for Data Science', 'Power BI',
  
    // Programming Languages
    'Java', 'Python', 'C++', 'Go', 'Rust', 'Ruby', 'Swift', 'Kotlin', 'C#', 'JavaScript', 'TypeScript', 'PHP', 'Progra', 'Perl', 'Scala', 'Shell Scripting',
  
    // Databases
    'MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Redis', 'Cassandra', 'MariaDB', 'Oracle DB', 'NoSQL', 'SQL Server', 'Elasticsearch', 'GraphQL',
  
    // Cloud Computing
    'AWS S3', 'AWS EC2', 'AWS Lambda', 'Azure', 'Google Cloud', 'Cloud Security', 'Docker', 'Kubernetes', 'Terraform', 'Serverless', 'Virtualization', 'Cloud Networking',
  
    // Artificial Intelligence
    'Neural Networks', 'SVM', 'K-Means Clustering', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'AI Ethics', 'Supervised Learning', 'Unsupervised Learning',
  
    // Mobile Development
    'Android Development', 'iOS Development', 'Flutter', 'React Native', 'Swift', 'Kotlin', 'Dart', 'Xamarin',
  
    // DevOps
    'Continuous Integration', 'Continuous Delivery', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Chef', 'Puppet', 'CI/CD', 'Cloud Automation',
  
    // Cyber Security
    'Ethical Hacking', 'Penetration Testing', 'Cryptography', 'Network Security', 'Web Application Security', 'Threat Intelligence', 'Firewalls', 'SIEM',
  
    // Blockchain
    'Bitcoin', 'Ethereum', 'Smart Contracts', 'Solidity', 'Cryptocurrency', 'Blockchain Development', 'Blockchain Security',
  
    // UI/UX Design
    'UI Design', 'UX Design', 'Wireframing', 'Prototyping', 'Figma', 'Sketch', 'Adobe XD', 'Usability Testing', 'Responsive Design',
  
    // Game Development
    'Unity', 'Unreal Engine', 'Game Programming', 'Game Design', '3D Modeling', 'Animation', 'Augmented Reality (AR)', 'Virtual Reality (VR)', 'Game Theory',
  
    // Internet of Things (IoT)
    'IoT Architecture', 'Raspberry Pi', 'Arduino', 'Sensors', 'Embedded Systems', 'IoT Security', 'IoT Protocols',
  
    // Business Intelligence
    'Data Warehousing', 'ETL', 'Power BI', 'Tableau', 'Business Analytics', 'Big Data Analytics', 'Machine Learning for Business', 'Salesforce',
  
    // Digital Marketing
    'SEO', 'SEM', 'Google Analytics', 'Content Marketing', 'Email Marketing', 'Social Media Marketing', 'Affiliate Marketing', 'PPC Campaigns',
  
    // Software Testing
    'Manual Testing', 'Automation Testing', 'Selenium', 'JUnit', 'TestNG', 'Test Automation', 'Performance Testing', 'API Testing', 'Agile Testing',
  
    // Agile & Scrum
    'Agile Methodology', 'Scrum Master', 'Kanban', 'Lean', 'User Stories', 'Sprint Planning', 'Jira', 'Product Backlog',
  
    // Networking
    'TCP/IP', 'OSI Model', 'Routing & Switching', 'Network Security', 'Wi-Fi', 'IPv4 & IPv6', 'DNS', 'DHCP', 'VPN', 'Network Troubleshooting',
  
    // Operating Systems
    'Linux Administration', 'Windows Administration', 'Unix', 'Shell Scripting', 'System Administration', 'Virtualization', 'Containerization', 'Windows Server', 'Networking in OS',
  
    // Robotics
    'Robot Programming', 'Robotic Process Automation', 'Robotics Operating System (ROS)', 'Autonomous Vehicles', 'Drone Technology',
  ];
  
  // Update suggestions based on the query
  useEffect(() => {
    const filteredCourses = allCourses.filter((course) =>
      course.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setCourseSuggestions(filteredCourses);
  }, [searchQuery]);

  const fetchQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:4000/api/quiz/${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data.');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setQuiz(data);
      } else {
        throw new Error('Invalid quiz data format');
      }
    } catch (error) {
      setError('Failed to fetch quiz data. Please try again.');
    } finally {
      setIsLoading(false);
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
    const calculatedScore = quiz.reduce((acc, q, index) => {
      const correctAnswer = q.answers.find((answer) => answer.correct === true) || q.answers[0];
      return acc + (userAnswers[index] === correctAnswer.text ? 1 : 0);
    }, 0);

    setScore(calculatedScore);
  };

  const handleReattempt = () => {
    setUserAnswers({});
    setScore(null);
    setCurrentQuestionIndex(0);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchQuiz();
    }
  }, [searchQuery]);

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
        padding: '20px',
      }}
    >
      <div
        className="quiz-container p-4"
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          color: '#333',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#6a11cb', fontWeight: 'bold' }}>
          Quiz for {searchQuery}
        </h2>

        {/* Search Bar with Datalist */}
        <form onSubmit={(e) => { e.preventDefault(); fetchQuiz(); }} className="d-flex mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter course name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            list="course-suggestions"
            style={{
              width: '300px',
              padding: '10px',
              borderRadius: '10px',
              marginRight: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
            }}
          />
          <button type="submit" className="btn btn-primary">Search</button>

         {/* Data list for search suggestions */}
  <datalist id="course-suggestions">
    {allCourses.map((course, index) => (
      <option key={index} value={course} />
    ))}
  </datalist>
        </form>

        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : score === null && quiz.length > 0 ? (
          <div>
            <div>
              <h4>
                Question {currentQuestionIndex + 1} of {quiz.length}
              </h4>
              <p>{quiz[currentQuestionIndex].question}</p>
            </div>
            {quiz[currentQuestionIndex].answers.map((option, index) => (
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
                <label className="form-check-label" htmlFor={`q-${currentQuestionIndex}-opt-${index}`}>
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
              {currentQuestionIndex < quiz.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!userAnswers[currentQuestionIndex]}
                >
                  Next
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={!userAnswers[currentQuestionIndex]}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : score !== null ? (
          <div className="text-center">
            <h3 style={{ color: '#6a11cb', fontWeight: 'bold' }}>
              Your Score: {score} / {quiz.length}
            </h3>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </button>
            <button className="btn btn-warning mt-3" onClick={handleReattempt}>
              Reattempt Quiz
            </button>
          </div>
        ) : (
          <p className="text-center"></p>
        )}
      </div>
    </div>
  );
};

export default QuizSearchPage;
