import { useState } from "react";
import axios from "axios";
import "../styles/LiveClassUpload.css";

function LiveClassUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    roomId: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "https://lms-app-cqbr.onrender.com/api/liveclasses/create",
        form
      );

      alert("Live Class Created Successfully");

      setForm({
        title: "",
        description: "",
        roomId: "",
        date: "",
        time: "",
      });

      window.location.href = "/liveclasses";
    } catch (error) {
      console.log(error);
      alert("Error creating live class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liveclass-container">
      <h1>Create Live Class</h1>

      <form
        className="liveclass-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Class Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Class Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="roomId"
          placeholder="Meeting Room ID"
          value={form.roomId}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Live Class"}
        </button>
      </form>
    </div>
  );
}

export default LiveClassUpload;