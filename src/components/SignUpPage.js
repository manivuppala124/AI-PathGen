import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from './api/api'; // Import the signup API function

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const token = await signup(name, email, password);
      localStorage.setItem('authToken', token);
      setMessage('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  const styles = {
    page: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    container: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '100%',
      maxWidth: '400px',
    },
    headline: {
      fontSize: '1.8rem',
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#000',
    },
    input: {
      marginBottom: '15px',
      padding: '10px',
      width: '100%',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      outline: 'none',
    },
    error: {
      color: '#dc3545',
      fontSize: '14px',
      marginBottom: '15px',
    },
    message: {
      color: '#28a745',
      fontSize: '14px',
      marginBottom: '15px',
    },
    button: {
      padding: '10px 15px',
      width: '100%',
      background: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.2s',
    },
    buttonHover: {
      backgroundColor: '#333',
    },
    footer: {
      marginTop: '20px',
      fontSize: '14px',
      color: '#333',
    },
    link: {
      color: '#000',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'color 0.2s',
    },
    linkHover: {
      color: '#555',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.headline}>Create an Account</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email Address"
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          {message && <div style={styles.message}>{message}</div>}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            Sign Up
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={styles.link}
            onMouseOver={(e) => Object.assign(e.target.style, styles.linkHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.link)}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
