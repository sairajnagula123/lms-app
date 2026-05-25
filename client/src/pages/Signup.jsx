import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "../styles/Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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

    setLoading(true);

    try {

      const res = await axios.post(
        "https://lms-app-cqbr.onrender.com/api/auth/signup",
        form
      );

      // Success Toast
      toast.success(res.data.msg || "Signup successful");

      // Clear Form
      setForm({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.error(err);

      // Backend Error
      if (err.response) {
        toast.error(err.response.data.msg || "Signup failed");
      }

      // Network Error
      else {
        toast.error("Server error / Network issue");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <h1>Sign Up</h1>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

      </form>

    </div>
  );
}

export default Signup;