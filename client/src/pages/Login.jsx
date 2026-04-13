import { useState } from 'react';
import '../styles/Signup.css';  // or `Login.css` — same styles reused

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);  // ✅ Save role here

    alert("Login successful");

    // Redirect based on role
    if (data.role === "admin") {
      window.location.href = "/upload"; // admin dashboard or upload
    } else {
      window.location.href = "/courses"; // student course page
    }
  } else {
    alert(data.msg || "Login failed");
  }
};

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
