import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// We'll reuse the same CSS

function Signup({ setIsLoggedIn, setUsername }) {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup validation logic here
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      // Mock sign up success
      setIsLoggedIn(true);
      setUsername(username);
      navigate('/'); // Redirect to home after signup
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
              value={username} 
              onChange={(e) => setUser(e.target.value)}
              placeholder="Name" 
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
              placeholder="Email" 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword"></label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="password"
              required 
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
