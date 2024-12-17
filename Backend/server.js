const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const quizRoutes = require('./routes/quizRoutes'); // Quiz routes
const pathRoutes = require('./routes/pathRoutes'); // Import path routes

// Routes



// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const MONGO_URI = "mongodb://localhost:27017/loginDetails";
mongoose
.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/quiz', quizRoutes); // Quiz routes
app.use('/api/path', pathRoutes); // Use path routes for learning path generation

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Learning Path Generator API!');
});

// Start Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
