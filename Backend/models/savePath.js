const mongoose = require('mongoose');

const LearningPathSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true, // e.g., "beginner", "intermediate", "advanced"
  },
  path: {
    type: [String], // Array of learning steps or resources
    required: true,
  },
  // quizResult: {
  //     type: Number, // User's score on the quiz
  //     required: true,
  //},
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date when saving
  },
});

module.exports = mongoose.model('LearningPath', LearningPathSchema);
