import { useState } from "react";
import '../styles/QuizUpload.css';
function QuizUpload() {
  const [form, setForm] = useState({
    courseId: "",       // You can set manually or via dropdown later
    question: "",
    options: ["", "", "", ""],
    correctAnswer: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/quizzes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Upload Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input name="courseId" placeholder="Course ID" onChange={handleChange} required />
        <input name="question" placeholder="Question" onChange={handleChange} required />

        {form.options.map((opt, idx) => (
          <input
            key={idx}
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            required
          />
        ))}

        <input name="correctAnswer" placeholder="Correct Answer" onChange={handleChange} required />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default QuizUpload;
