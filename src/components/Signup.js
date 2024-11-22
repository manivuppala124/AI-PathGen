import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { signup } from './api/api'; // Import signup function from api.js

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added error state
  const [message, setMessage] = useState(''); // Added message state
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    setMessage(''); // Reset success message

    try {
      const token = await signup(name, email, password); // API call to signup function
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      setMessage('Signup successful!');
      
      
      navigate('/'); 
    } catch (err) {
      setError(err || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username"></label>
            <input 
              type="text" 
              id="username" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Username" 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="email"></label>
            <input 
              type="email" 
              id="string" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email" 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="Password"></label>
            <input 
              type="password" 
              id="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="password"
              required 
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
          {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>} {/* Display success message */}
          <p style={{ textAlign: 'center' }}></p>
        </p>
      </div>
    </div>
  );
}

export default Signup;
