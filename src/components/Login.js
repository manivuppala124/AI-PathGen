import React, { useState } from 'react';
import { login } from './api/api'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added error state
  const [message, setMessage] = useState(''); // Added message state
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    setMessage(''); // Reset success message

    try {
      const token = await login(email, password); // API call to login function
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      setMessage('Login successful!');
      
      // Redirect to home page (or dashboard) after successful login
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      setError(err || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email"></label>
            <input 
              type="text" 
              id="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="UserName/Email"
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password"></label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password"
              required 
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
          {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>} {/* Display success message */}
        <p style={{ textAlign: 'center' }}></p>
        </p>
      </div>
    </div>
  );
}

export default Login;
