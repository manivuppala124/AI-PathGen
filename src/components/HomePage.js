import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    { name: 'Full Stack Web Development', courses: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'] },
    { name: 'Data Science', courses: ['Python', 'Pandas', 'Machine Learning', 'Deep Learning'] },
    { name: 'Programming Languages', courses: ['Java', 'Python', 'C++', 'Go'] },
    { name: 'Databases', courses: ['MySQL', 'MongoDB', 'PostgreSQL'] },
    // Add more categories as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/quiz/${searchTerm}`); // Change URL to /quiz/courseName
    }
  };

  const handleCourseClick = (course) => {
    navigate(`/quiz/${course}`); // Change URL to /quiz/courseName
  };

  return (
    <div className="container">
      <h1>Search for a Course</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter course name"
          required
          style={{ width: '100%', padding: '10px', fontSize: '1.2em' }} // Make the search input larger
        />
        <button type="submit">Search</button>
      </form>

      <h2 style={{ backgroundColor: '#f8f9fa', padding: '10px', marginTop: '20px' }}>Categories</h2>
      {categories.map((category) => (
        <div key={category.name}>
          <h3>{category.name}</h3>
          <ul>
            {category.courses.map((course) => (
              <li key={course} onClick={() => handleCourseClick(course)}>
                {course}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
