import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

import "../styles/Signup.css";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

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
        "https://lms-app-cqbr.onrender.com/api/auth/signup",
        form
      );

      alert(res.data.msg);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");

    } catch (err) {

      console.log(err);

      if (err.response) {

        setError(err.response.data.msg);

      } else {

        setError("Server Error");

      }

    } finally {

      setLoading(false);

    }

  };

  const handleGoogleLogin = async (
    credentialResponse
  ) => {

    try {

      const res = await axios.post(
        "https://lms-app-cqbr.onrender.com/api/auth/google-login",
        {
          credential:
            credentialResponse.credential,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      navigate("/");

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert(
        "Google Login Failed"
      );

    }

  };

  return (

    <div className="signup-container">

      {/* LEFT SIDE */}

      <div className="signup-left">

        <div className="overlay">

          <h1>MyLMS</h1>

          <h2>
            Start Your <br />
            Learning Journey
          </h2>

          <p>
            Join thousands of learners and explore
            courses anytime anywhere.
          </p>

          <div className="feature">

            <span>📚</span>

            <div>
              <h4>Expert Instructors</h4>
              <p>Learn from the best mentors</p>
            </div>

          </div>

          <div className="feature">

            <span>🎥</span>

            <div>
              <h4>Live Classes</h4>
              <p>Interactive live sessions</p>
            </div>

          </div>

          <div className="feature">

            <span>🏆</span>

            <div>
              <h4>Get Certified</h4>
              <p>Boost your career skills</p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="signup-right">

        <div className="signup-card">

          <h1>Create Account</h1>

          <p className="subtitle">
            Fill your details to get started
          </p>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            {/* PASSWORD */}

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="off"
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </span>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Signing Up..."
                : "Sign Up"}

            </button>

          </form>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                marginBottom: "10px",
                color: "#666",
              }}
            >
              OR
            </p>

            <GoogleLogin
              onSuccess={
                handleGoogleLogin
              }
              onError={() =>
                alert(
                  "Google Login Failed"
                )
              }
            />
          </div>

          {/* LOGIN */}

          <p className="login-text">

            Already have an account?{" "}

            <span
              onClick={() => navigate("/login")}
            >
              Login
            </span>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Signup;