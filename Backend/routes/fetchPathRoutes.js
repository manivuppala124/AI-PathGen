const express = require('express');
const mongoose = require('mongoose');
const LearningPath = require('../models/savePath'); // Assuming this is your model

const router = express.Router();

// Fetch course names for the user
router.get('/recent-activity/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const courses = await LearningPath.find({ userId }).distinct('courseName');
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching courses', error });
  }
});

// Fetch learning paths for a specific course
router.get('/learning-path/:userId/:courseName', async (req, res) => {
  const { userId, courseName } = req.params;

  try {
    const paths = await LearningPath.find({ userId, courseName }).select('path -_id');
    res.json({ success: true, paths });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching learning paths', error });
  }
});

module.exports = router;
