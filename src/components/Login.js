import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 // We'll create a shared CSS file for styling

function Login({ setIsLoggedIn, setUsername }) {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login validation logic here, for now, we'll mock success
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setUsername(username);
      navigate('/'); // Redirect to the home page after successful login
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username"></label>
            <input 
              type="text" 
              id="Email" 
              value={username} 
              onChange={(e) => setUser(e.target.value)} 
              placeholder="Email"
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
        </p>
      </div>
    </div>
  );
}

export default Login;
