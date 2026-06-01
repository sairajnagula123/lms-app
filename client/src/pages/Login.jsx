import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import axios from "axios";

import "../styles/Login.css";

import { GoogleLogin } from "@react-oauth/google";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  toast,
} from "react-toastify";

/* IMAGE */
import loginImage
from "../assets/signup-image.png";

function Login() {

  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  // FORM STATE
  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  // INPUT CHANGE
  const handleChange =
    (e) => {

      setForm({
        ...form,

        [e.target.name]:
          e.target.value,
      });
    };

  // LOGIN
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

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
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

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(
        "Login Successful"
      );

      navigate("/");

      window.location.reload();

    } catch (err) {

      console.log(err);

      toast.error(
        "Google Login Failed"
      );

    }
  };

  return (

    <div className="login-container">

      {/* LEFT */}
      <div className="login-left">

        <div className="login-content">

          <h1>MyLMS</h1>

          <h2>
            Welcome Back
          </h2>

          <p>
            Continue your learning journey
            with interactive courses and
            live classes.
          </p>

        </div>

        <img
          src={loginImage}
          alt="login"
          className="login-image"
        />

      </div>

      {/* RIGHT */}
      <div className="login-right">

        <div className="login-card">

          <h1>Login</h1>

          <p className="subtitle">
            Enter your credentials
            to continue
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

            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("Google Login Failed")}
                width="350"
              />
            </div>
          </div>

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