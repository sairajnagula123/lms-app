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

      alert("Live Class Created Successfully");

      // ✅ Clear Form
      setForm({
        title: "",
        description: "",
        roomId: "",
        date: "",
        time: "",
      });

      // ✅ Redirect Admin To View Classes
      window.location.href = "/liveclasses";

    } catch (error) {

      console.log(error);

      alert("Error creating live class");

    }

  };

  return (
    <div className="auth-container">

      <h1>Create Live Class</h1>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        {/* CLASS TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Class Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* ROOM ID */}
        <input
          type="text"
          name="roomId"
          placeholder="Meeting Room ID"
          value={form.roomId}
          onChange={handleChange}
          required
        />

        {/* DATE */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        {/* TIME */}
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON */}
        <button type="submit">
          Create Live Class
        </button>

      </form>

    </div>
  );
}

export default LiveClassUpload;