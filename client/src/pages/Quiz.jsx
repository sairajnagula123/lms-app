import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../styles/Quiz.css";

function Quiz() {

  const { courseId } =
    useParams();

  const [questions, setQuestions] =
    useState([]);

  const [answers, setAnswers] =
    useState({});

  const [courseTitle,
    setCourseTitle] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting,
    setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  // TIMER
  const [timeLeft, setTimeLeft] =
    useState(300);

  const API_URL =
    process.env.REACT_APP_API_URL;

  /* =========================
     FETCH QUIZ
  ========================= */

  useEffect(() => {

    const fetchQuiz =
      async () => {

        try {

          setLoading(true);

          const res =
            await axios.get(
              `${API_URL}/api/quizzes/${courseId}`
            );

          setQuestions(res.data);

          if (
            res.data.length > 0
          ) {

            setCourseTitle(
              res.data[0].courseTitle || ""
            );

          }

        } catch (err) {

          console.error(err);

          setError(
            "Failed to load quiz"
          );

        } finally {

          setLoading(false);

        }

      };

    fetchQuiz();

  }, [courseId, API_URL]);

  /* =========================
     TIMER
  ========================= */

  useEffect(() => {

    if (timeLeft <= 0) {

      alert("Time Up!");

      return;
    }

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [timeLeft]);

  /* =========================
     SELECT ANSWER
  ========================= */

  const handleSelect =
    (qId, answer) => {

      setAnswers({
        ...answers,
        [qId]: answer,
      });

    };

  /* =========================
     SUBMIT QUIZ
  ========================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setSubmitting(true);

      let score = 0;

      questions.forEach((q) => {

        if (
          answers[q._id] ===
          q.correctAnswer
        ) {

          score++;

        }

      });

      alert(
        `You scored ${score} / ${questions.length}`
      );

      // PASS CONDITION
      if (
        score >=
        Math.ceil(
          questions.length / 2
        )
      ) {

        try {

          const res =
            await axios.post(
              `${API_URL}/api/certificates/generate`,
              {
                userEmail:
                  localStorage.getItem(
                    "userEmail"
                  ),

                courseTitle:
                  courseTitle ||
                  "Untitled Course",
              }
            );

          alert(
            res.data.message ||
            "Certificate generated!"
          );

        } catch (err) {

          console.error(err);

          alert(
            "Error generating certificate."
          );

        }

      }

      setSubmitting(false);

    };

  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="quiz-container">

        <h2>
          Loading Quiz...
        </h2>

      </div>

    );

  }

  /* =========================
     ERROR
  ========================= */

  if (error) {

    return (

      <div className="quiz-container">

        <h2>{error}</h2>

      </div>

    );

  }

  return (

    <div className="quiz-container">

      <h2>
        Quiz - {courseTitle}
      </h2>

      {/* TIMER */}

      <div className="quiz-timer">

        Time Left :

        {Math.floor(timeLeft / 60)}
        :

        {String(timeLeft % 60)
          .padStart(2, "0")}

      </div>

      <form
        onSubmit={handleSubmit}
      >

        {questions.map(
          (q, index) => (

            <div
              className="quiz-question"
              key={q._id}
            >

              <p>

                {index + 1}.
                {" "}
                {q.question}

              </p>

              {q.options.map(
                (opt, i) => {

                  const labels = [
                    "A",
                    "B",
                    "C",
                    "D",
                  ];

                  return (

                    <label
                      key={i}
                      className="quiz-option"
                    >

                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        onChange={() =>
                          handleSelect(
                            q._id,
                            opt
                          )
                        }
                        required
                      />

                      <span className="option-label">

                        {labels[i]}.

                      </span>

                      {opt}

                    </label>

                  );

                }
              )}

              <hr />

            </div>

          )
        )}

        <button
          className="quiz-submit"
          type="submit"
          disabled={submitting}
        >

          {submitting
            ? "Submitting..."
            : "Submit Quiz"}

        </button>

      </form>

    </div>

  );
}

export default Quiz;