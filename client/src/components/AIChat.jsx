import { useState } from "react";
import axios from "axios";
import "../styles/AIChat.css";

function AIChat({ courseTitle, onClose }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/ai/ask`, {
        question: `
You are helping a student studying the course:

${courseTitle}

Student Question:
${question}
`,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.answer,
        },
      ]);

      setQuestion("");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="ai-chat-container">

      <div className="ai-chat-header">

        <h3>🤖 AI Tutor</h3>

        <button onClick={onClose}>
          ✖
        </button>

      </div>

      <div className="ai-chat-body">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-msg"
                : "ai-msg"
            }
          >
            <strong>
              {msg.sender === "user"
                ? "You"
                : "AI"}
            </strong>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {msg.text}
            </p>

          </div>
        ))}

        {loading && (
          <p>🤖 Thinking...</p>
        )}

      </div>

      <div className="ai-chat-footer">

        <textarea
          rows="3"
          placeholder="Ask about this course..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
        />

        <button onClick={handleSend}>
          Send
        </button>

      </div>

    </div>
  );
}

export default AIChat;