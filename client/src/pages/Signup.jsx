import { useState } from 'react';
import '../styles/Signup.css';

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("CLICK WORKING"); // 👈 MUST PRINT

  try {
    const res = await fetch("https://lms-app-cqbr.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    console.log("Response:", res);

    const data = await res.json();
    console.log("Data:", data);

    alert(data.msg);

  } catch (err) {
    console.error(err);
    alert("Error");
  }
};

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;



