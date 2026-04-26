import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/Quiz.css';

function Quiz() {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [courseTitle, setCourseTitle] = useState("");

  // Fetch quiz and course title
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL.VITE_API_URL}/api/quizzes/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        if (data.length > 0) {
          setCourseTitle(data[0].courseTitle || ""); // Make sure this field is included in backend
        }
      });
  }, [courseId]);

  const handleSelect = (qId, answer) => {
    setAnswers({ ...answers, [qId]: answer });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let score = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    alert(`You scored ${score} / ${questions.length}`);

    // ✅ Generate certificate if score >= 2
    if (score >= 2) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL.VITE_API_URL}/api/certificates/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: localStorage.getItem("email"),
            courseTitle: courseTitle || "Untitled Course",
          }),
        });
        const data = await res.json();
        alert(data.message || "Certificate generated!");
      } catch (err) {
        alert("Error generating certificate.");
      }
    }
  };

  return (
    <div className="quiz-container">
      <h2>Quiz - {courseTitle}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div className="quiz-question" key={q._id}>
            <p>{index + 1}. {q.question}</p>
            {q.options.map((opt, i) => (
              <label key={i} className="quiz-option">
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  onChange={() => handleSelect(q._id, opt)}
                  required
                />
                {opt}
              </label>
            ))}
            <hr />
          </div>
        ))}

        <button className="quiz-submit" type="submit">Submit Quiz</button>
      </form>
    </div>
  );
}

export default Quiz;
