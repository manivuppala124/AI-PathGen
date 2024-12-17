import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../images/background.mp4';
const HomePage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, // Ensures the video is behind other content
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff', // Ensures text is visible over the video
          padding: '20px',
        }}
      >
        <div
          style={{
            padding: '30px',
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for better contrast
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            PathGen AI
          </h1>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '20px',
              color: '#ddd',
            }}
          >
            Unlock the future of learning. Your journey to success starts here!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={handleSignUpClick}
              style={{
                padding: '10px 15px',
                fontSize: '1rem',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#0056b3';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#007bff';
              }}
            >
              Get Started
            </button>
            <button
              onClick={handleLoginClick}
              style={{
                padding: '10px 15px',
                fontSize: '1rem',
                background: '#f8f9fa',
                color: '#007bff',
                border: '1px solid #007bff',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.color = '#007bff';
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
