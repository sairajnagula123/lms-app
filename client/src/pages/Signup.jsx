import { useState } from "react";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("CLICK WORKING");

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://lms-app-cqbr.onrender.com/api/auth/signup",
        form
      );

      console.log("Response:", res.data);

      alert(res.data.msg);

      // Optional: clear form after signup
      setForm({
        name: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.msg || "Signup failed");
      } else {
        setError("Server error / Network issue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>

      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;