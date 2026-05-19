import { useState } from "react";
import axios from "axios";

function LiveClassUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    roomId: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://lms-app-cqbr.onrender.com/api/liveclasses/create",
        form
      );

      alert("Live Class Created");

      setForm({
        title: "",
        description: "",
        roomId: "",
        date: "",
        time: "",
      });

    } catch (error) {
      console.log(error);
      alert("Error creating class");
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Live Class</h1>

      <form className="auth-form" onSubmit={handleSubmit}>

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
          placeholder="Description"
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

        <button type="submit">
          Create Live Class
        </button>

      </form>
    </div>
  );
}

export default LiveClassUpload;