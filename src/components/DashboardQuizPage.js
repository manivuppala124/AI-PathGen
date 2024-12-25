import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import md5 from 'md5';
import Footer from './Footer';

const DashboardQuizPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [showRecentActivity, setShowRecentActivity] = useState(false);
  const [showFeaturedCourses, setShowFeaturedCourses] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setImage(userData.profileImage);

      // Load user-specific data (recent activities and progress)
      const userRecentActivities = JSON.parse(localStorage.getItem(`${userData.email}-recentActivities`)) || [];
      setRecentActivities(userRecentActivities);

      const userProgressData = JSON.parse(localStorage.getItem(`${userData.email}-progressData`)) || {};
      setProgressData(userProgressData);
    } else {
      setUser({ name: 'Guest User', email: 'guest@example.com' });
    }
  }, []);

  const categories = [
    { name: 'Full Stack Web Development', courses: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'] },
    { name: 'Data Science', courses: ['Python', 'Pandas', 'Machine Learning', 'Deep Learning', 'Data Visualization'] },
    { name: 'Programming Languages', courses: ['Java', 'Python', 'C++', 'Go', 'Rust'] },
    { name: 'Databases', courses: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Redis'] },
    { name: 'Cloud Computing', courses: ['AWS S3', 'AWS EC2', 'Azure', 'Google Cloud', 'Cloud Security'] },
    { name: 'Artificial Intelligence', courses: ['Neural Networks', 'SVM', 'K-Means Clustering', 'Deep Learning', 'Natural Language Processing'] }
  ];
  
  const featuredCourses = ['React', 'Machine Learning', 'MongoDB'];
  
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
  
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/quiz/${searchQuery.trim()}`);
    } else {
      alert('Please enter a course to search.');
    }
  };
  
  const filteredCourses = allCourses.filter(course =>
    course.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    navigate(`/quiz/${course}`);

    // Track recent activity for the course clicked
    const newActivity = { course, type: 'Quiz', date: new Date().toISOString() };
    const updatedActivities = [newActivity, ...recentActivities].slice(0, 5); // Keep only the latest 5 activities
    setRecentActivities(updatedActivities);

    // Save the updated recent activities to localStorage for the user
    if (user && user.email) {
      localStorage.setItem(`${user.email}-recentActivities`, JSON.stringify(updatedActivities));
    }

    // Update progress for the course clicked
    const updatedProgressData = {
      ...progressData,
      [course]: (progressData[course] || 0) + 10, // Increment progress by 10% for example
    };
    setProgressData(updatedProgressData);

    // Save the updated progress data to localStorage for the user
    if (user && user.email) {
      localStorage.setItem(`${user.email}-progressData`, JSON.stringify(updatedProgressData));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem(`${user?.email}-recentActivities`);
    localStorage.removeItem(`${user?.email}-progressData`);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? '#fff' : '#121212';
    document.body.style.color = darkMode ? '#000' : '#fff';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        const updatedUser = { ...user, profileImage: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const gravatarUrl = user?.email ? `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon` : 'https://www.example.com/default-avatar.jpg'; // Fallback to default avatar if no email

  // Toggle visibility of Recent Activity
  const handleRecentActivityClick = () => {
    setShowRecentActivity(!showRecentActivity);
    setShowFeaturedCourses(false); // Hide featured courses if recent activity is clicked
  };
  
  // const handleTakeQuiz = (course) => {
  //   navigate(`/quiz/${course}`);
  // };
 const handleTakeQuiz = () => {
  navigate('/quiz-search');
};

  // Toggle visibility of Featured Courses
  const handleFeaturedCoursesClick = () => {
    setShowFeaturedCourses(!showFeaturedCourses);
    setShowRecentActivity(false); // Hide recent activity if featured courses is clicked
  };

  return (
    <div
      style={{
        background: darkMode ? '#121212' : 'linear-gradient(to bottom, #6a11cb, #2575fc)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '30px',
        color: darkMode ? '#fff' : '#fff',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
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
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
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
                  className="dropdown-item"
                  style={{ color: darkMode ? '#fff' : '#000' }}
                  onClick={handleTakeQuiz}
                >
                  Take Quiz
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

      {/* Welcome Section */}
      <div className="text-center mb-5">
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#ffcc00',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Welcome to PathGen
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#fff',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          Discover your learning path and start your educational journey!
        </p>
      </div>

      {/* Featured Courses */}
      {showFeaturedCourses && (
        <div className="container mb-5">
          <h2 className="text-warning mb-4">Featured Courses</h2>
          <ul className="list-group">
            {featuredCourses.map((course, index) => (
              <li key={index} className="list-group-item">
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Activity */}
      {showRecentActivity && (
        <div className="container mb-5">
          <h2 className="text-warning mb-4">Recent Activities</h2>
          <ul className="list-group">
            {recentActivities.length === 0 ? (
              <p>No recent activities found.</p>
            ) : (
              recentActivities.map((activity, index) => (
                <li key={index} className="list-group-item">
                  <strong>{activity.course}</strong> - {activity.type} - {new Date(activity.date).toLocaleString()}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Search Form */}

<form onSubmit={handleSearch} className="mb-5 d-flex">
  <input
    type="text"
    className="form-control"
    placeholder="Search for a course..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    list="course-suggestions" // Connect the input to the datalist
    style={{
      width: '400px',
      padding: '15px',
      borderRadius: '10px',
      marginRight: '10px',
      fontSize: '1.1rem',
    }}
  />
  
  {/* Data list for search suggestions */}
  <datalist id="course-suggestions">
    {allCourses.map((course, index) => (
      <option key={index} value={course} />
    ))}
  </datalist>

  <button
    type="submit"
    className="btn btn-primary"
    style={{
      padding: '15px 30px',
      fontSize: '1.1rem',
      borderRadius: '10px',
    }}
  >
    Search
  </button>
</form>


      {/* Category Selection */}
      <div className="row mb-5">
        {categories.map((category) => (
          <div className="col-md-4 mb-4" key={category.name}>
            <div
              className="card"
              style={{
                backgroundColor: '#1c1c1c',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 className="card-title text-warning">{category.name}</h4>
              <ul className="list-group list-group-flush">
                {category.courses.map((course, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    style={{
                      backgroundColor: '#2c2c2c',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      color: '#fff',
                      fontWeight: 'bold',
                      margin: '5px 0',
                      padding: '10px 15px',
                      textAlign: 'left',
                      transition: 'transform 0.2s ease, background-color 0.3s ease',
                    }}
                    onClick={() => handleCourseClick(course)}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#333';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#2c2c2c';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default DashboardQuizPage;