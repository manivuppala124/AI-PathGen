import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1c1c1c',
        color: '#fff',
        padding: '30px 0',
        textAlign: 'center',
        marginTop: 'auto',
        boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
      }}
    >
      <div className="row mb-4" style={{ margin: '0' }}>
        <div className="col-md-4">
          <h5 style={{ color: '#ffcc00' }}>PathGen</h5>
          <p>
            Your personalized learning path generator. Discover, learn, and grow with PathGen!
          </p>
        </div>

        <div className="col-md-4">
          <h5 style={{ color: '#ffcc00' }}>Quick Links</h5>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/dashboard" style={linkStyle}>Dashboard</a></li>
            <li><a href="/profile" style={linkStyle}>Profile</a></li>
            <li><a href="/courses" style={linkStyle}>Courses</a></li>
            <li><a href="/contact" style={linkStyle}>Contact Us</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5 style={{ color: '#ffcc00' }}>Connect with Us</h5>
          <div>
            <a href="https://facebook.com" style={iconStyle} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://twitter.com" style={iconStyle} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://linkedin.com" style={iconStyle} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="https://github.com" style={iconStyle} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github fa-2x"></i>
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #444', paddingTop: '15px', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} PathGen. All rights reserved.
      </div>
    </footer>
  );
};

const linkStyle = {
  color: '#ffcc00',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '8px',
  transition: 'color 0.3s',
};

const iconStyle = {
  color: '#ffcc00',
  margin: '0 10px',
  transition: 'transform 0.3s',
};

export default Footer;
