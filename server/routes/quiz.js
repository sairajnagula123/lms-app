const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// POST - Admin uploads a quiz
router.post("/add", async (req, res) => {
  try {
    const { courseId, question, options, correctAnswer } = req.body;
    const quiz = new Quiz({ courseId, question, options, correctAnswer });
    await quiz.save();
    res.json({ message: "Quiz added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET - Fetch quiz questions for a course
router.get("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const questions = await Quiz.find({ courseId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
