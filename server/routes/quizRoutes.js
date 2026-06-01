const express = require("express");
const router = express.Router();

const {
  addQuiz,
  getQuizByCourse,
} = require(
  "../controllers/quizController"
);

// ADD QUIZ
router.post(
  "/add",
  addQuiz
);

// GET QUIZ BY COURSE
router.get(
  "/:courseId",
  getQuizByCourse
);

module.exports = router;