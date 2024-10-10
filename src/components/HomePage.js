import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [courseName, setCourseName] = useState('');
  const [category, setCategory] = useState(''); // State for category selection
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseName) {
      navigate(`/learn/${courseName}`);
    }
  };

  const handleCategoryClick = (course) => {
    setCourseName(course);
    navigate(`/learn/${course}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Learning Path Generator</h1>
      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>

      <div className="categories mt-5">
        <h2>Course Categories</h2>
        <div className="d-flex flex-wrap justify-content-center">
          <div className="card m-2" onClick={() => handleCategoryClick('Web Development')}>
            <div className="card-body">
              <h5 className="card-title">Web Development</h5>
            </div>
          </div>
          <div className="card m-2" onClick={() => handleCategoryClick('Data Science')}>
            <div className="card-body">
              <h5 className="card-title">Data Science</h5>
            </div>
          </div>
          <div className="card m-2" onClick={() => handleCategoryClick('Machine Learning')}>
            <div className="card-body">
              <h5 className="card-title">Machine Learning</h5>
            </div>
          </div>
          <div className="card m-2" onClick={() => handleCategoryClick('Mobile App Development')}>
            <div className="card-body">
              <h5 className="card-title">Mobile App Development</h5>
            </div>
          </div>
          <div className="card m-2" onClick={() => handleCategoryClick('Cybersecurity')}>
            <div className="card-body">
              <h5 className="card-title">Cybersecurity</h5>
            </div>
          </div>
          <div className="card m-2" onClick={() => handleCategoryClick('Game Development')}>
            <div className="card-body">
              <h5 className="card-title">Game Development</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
