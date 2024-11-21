// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add styling for the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">PathGen</Link>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link> 
      </div>
    </nav>
  );
}; 
<div className="login-page">
      <div className="login-container">
        <h2>Login to PathGen</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div className="signup">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>

export default Navbar;
