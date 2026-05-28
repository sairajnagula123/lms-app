import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast } from "react-toastify";

/* IMPORT IMAGE */
import loginImage from "../assets/signup-image.png";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  // FORM STATE
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // HANDLE LOGIN
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const res =
          await axios.post(
            "https://lms-app-cqbr.onrender.com/api/auth/login",
            form
          );

        toast.success(
          "Login Successful"
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "role",
          res.data.role
        );

        setTimeout(() => {

          navigate("/");

          window.location.reload();

        }, 1500);

      } catch (err) {

        console.log(err);

        if (err.response) {

          toast.error(
            err.response.data.msg
          );

        } else {

          toast.error(
            "Server Error"
          );

        }

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="login-container">

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      {/* LEFT SIDE */}
      <div className="login-left">

        {/* TEXT */}
        <div className="login-content">

          <h1>MyLMS</h1>

          <h2>
            Welcome Back
          </h2>

          <p>
            Continue your learning journey with
            interactive courses and live classes.
          </p>

        </div>

        {/* IMAGE BELOW TEXT */}
        <img
          src={loginImage}
          alt="login"
          className="login-image"
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-card">

          <h1>Login</h1>

          <p className="subtitle">
            Enter your credentials to continue
          </p>

          <form
            onSubmit={handleSubmit}
            autoComplete="on"
          >

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            {/* PASSWORD */}
            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                spellCheck="false"
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
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
                ? "Logging In..."
                : "Login"}

            </button>

          </form>

          {/* SIGNUP */}
          <p className="signup-text">

            New here?{" "}

            <span
              onClick={() =>
                navigate("/signup")
              }
            >
              Create Account
            </span>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;
