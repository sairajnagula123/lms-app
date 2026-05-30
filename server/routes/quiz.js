const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

router.post("/add", async (req, res) => {
  try {
    const { courseId, questions } = req.body;

    if (!courseId) {
      return res
        .status(400)
        .json({ message: "Course ID required" });
    }

    if (
      !questions ||
      questions.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "No questions found" });
    }

    const quizDocs = questions.map((q) => ({
      courseId,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
    }));

    await Quiz.insertMany(quizDocs);

    res.status(201).json({
      message:
        "Quiz questions uploaded successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const questions = await Quiz.find({
      courseId,
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;