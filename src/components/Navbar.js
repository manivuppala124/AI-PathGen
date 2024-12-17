import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import md5 from 'md5';

const Navbar = ({ user, image, darkMode, toggleDarkMode, handleLogout, setShowRecentActivity, setShowFeaturedCourses }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const gravatarUrl = user?.email
    ? `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon`
    : 'https://www.example.com/default-avatar.jpg';

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRecentActivityClick = () => {
    setShowRecentActivity((prev) => !prev);
    setShowFeaturedCourses(false); // Hide featured courses if recent activity is clicked
  };

  const handleFeaturedCoursesClick = () => {
    setShowFeaturedCourses((prev) => !prev);
    setShowRecentActivity(false); // Hide recent activity if featured courses is clicked
  };

  return (
    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
      <div className="dropdown" style={{ position: 'relative' }}>
        <img
          src={image || gravatarUrl}
          alt="Profile"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'transform 0.3s ease',
          }}
          onClick={toggleDropdown}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        />
        {dropdownOpen && (
          <ul
            className="dropdown-menu show"
            style={{
              position: 'absolute',
              top: '60px',
              right: '0',
              background: darkMode ? '#333' : '#ffffff',
              borderRadius: '10px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '10px',
              minWidth: '250px',
              zIndex: 100,
              border: `2px solid ${darkMode ? '#666' : '#ffcc00'}`,
            }}
          >
            <li>
              <a
                href="#recent-activity"
                className="dropdown-item"
                onClick={handleRecentActivityClick}
                style={{ color: darkMode ? '#fff' : '#000' }}
              >
                Recent Activity
              </a>
            </li>
            <li>
              <a
                href="#featured-courses"
                className="dropdown-item"
                onClick={handleFeaturedCoursesClick}
                style={{ color: darkMode ? '#fff' : '#000' }}
              >
                Featured Courses
              </a>
            </li>
            <li>
              <a
                href="#light-dark-mode"
                className="dropdown-item"
                onClick={toggleDarkMode}
                style={{ color: darkMode ? '#fff' : '#000' }}
              >
                Toggle Light/Dark Mode
              </a>
            </li>
            <li>
              <a
                href="#logout"
                className="dropdown-item"
                onClick={handleLogout}
                style={{ color: darkMode ? '#fff' : '#000' }}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
