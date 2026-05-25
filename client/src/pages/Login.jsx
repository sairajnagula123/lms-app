import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Signup.css";

function Login() {
  const [form, setForm] = useState({
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

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://lms-app-cqbr.onrender.com/api/auth/login",
        form
      );

      // Axios automatically stores response inside res.data
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      toast.success("Login successful");

      if (data.role === "admin") {
        window.location.href = "/upload";
      } else {
        window.location.href = "/courses";
      }
    } catch (err) {
      console.error(err);

      // Backend error message
      if (err.response) {
        setError(err.response.data.msg || "Login failed");
      }
      // Network/server down
      else {
        setError("Server error / Network issue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;