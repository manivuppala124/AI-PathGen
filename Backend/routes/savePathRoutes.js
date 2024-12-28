const jwt = require('jsonwebtoken');
const LearningPath = require('../models/savePath');
const router = require('express').Router();

const JWT_SECRET = '12345';

// Middleware to authenticate the user based on JWT token
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  //console.log(token); // Get token from header
  if (!token) return res.status(401).json({ error: 'Authorization token required' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.userId = decoded.id;
    console.log(decoded);
    console.log(req.userId);
    next();
  });
};

// Save learning path for the logged-in user
router.post('/save', authenticateUser, async (req, res) => {
  try {
    const { courseName, level, path } = req.body;

    if (!courseName || !level || !path ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newLearningPath = new LearningPath({
      userId: req.userId, // The authenticated user's ID
      courseName,
      level,
      path, // The quiz result obtained by the userResult, // The quiz result obtained by the userResult, // The quiz result obtained by the user
    });

    await newLearningPath.save();
    res.status(201).json({ message: 'Learning path saved successfully!' });
  } catch (error) {
    console.error('Error saving learning path:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router; // Export router instead of authenticateUser
