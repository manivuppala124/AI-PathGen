import React, { useState } from 'react';
import { login } from './api/api';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const token = await login(email, password);
      localStorage.setItem('authToken', token);
      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    alert('You have been logged out.');
    navigate('/');
  };

  const styles = {
    page: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, #6a11cb, #2575fc)',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      width: '90%',
      maxWidth: '400px',
    },
    headline: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#ffcc00',
    },
    input: {
      marginBottom: '15px',
      padding: '12px',
      width: '100%',
      borderRadius: '25px',
      border: 'none',
      outline: 'none',
      fontSize: '1rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    error: {
      color: '#ff4d4f',
      fontSize: '14px',
      marginBottom: '15px',
    },
    success: {
      color: '#4caf50',
      fontSize: '14px',
      marginTop: '10px',
    },
    button: {
      padding: '12px 20px',
      width: '100%',
      background: 'linear-gradient(90deg, #ff7a18, #ffcc00)',
      color: '#fff',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.4)',
    },
    link: {
      color: '#6a11cb',
      textDecoration: 'underline',
      fontWeight: 'bold',
    },
    linkHover: {
      color: '#fff',
    },
    logoutButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      padding: '10px 20px',
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.page}>
      {localStorage.getItem('authToken') && (
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      )}
      <div style={styles.container}>
        <h1 style={styles.headline}>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={styles.link}
            onMouseOver={(e) => Object.assign(e.target.style, styles.linkHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.link)}
          >
            Sign Up
          </Link>
        </p>
        {message && <div style={styles.success}>{message}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
