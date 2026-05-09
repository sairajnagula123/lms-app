import { useState } from "react";
import axios from "axios";
import "../styles/QuizUpload.css";

function QuizUpload() {

  const [form, setForm] = useState({
    courseId: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {

    const updated = [...form.options];

    updated[index] = value;

    setForm({
      ...form,
      options: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${API_URL}/api/quizzes/add`,
        form
      );

      alert(res.data.message || "Quiz added successfully!");

      // Reset form
      setForm({
        courseId: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });

    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.message || "Failed to add quiz");
      } else {
        setError("Server error / Network issue");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-upload-container">

      <h2>Upload Quiz</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          name="courseId"
          placeholder="Course ID"
          value={form.courseId}
          onChange={handleChange}
          required
        />

        <input
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleChange}
          required
        />

        {form.options.map((opt, idx) => (
          <input
            key={idx}
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) =>
              handleOptionChange(idx, e.target.value)
            }
            required
          />
        ))}

        <input
          name="correctAnswer"
          placeholder="Correct Answer"
          value={form.correctAnswer}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Question"}
        </button>

      </form>
    </div>
  );
}

export default QuizUpload;