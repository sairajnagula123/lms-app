import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

function Navbar({
  darkMode,
  setDarkMode,
}) {

  const [role, setRole] =
    useState("");

  const navigate =
    useNavigate();

  useEffect(() => {

    setRole(
      localStorage.getItem("role") || ""
    );

  }, []);

  const logout = () => {

    localStorage.clear();

    setRole("");

    navigate("/");
  };

  return (

    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">

        🎓 <span>MyLMS</span>

      </div>

      {/* LINKS */}
      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        {role === "user" && (
          <>

            <li>
              <Link to="/courses">
                Courses
              </Link>
            </li>

            <li>
              <Link to="/liveclasses">
                Live Classes
              </Link>
            </li>

            <li>
              <Link to="/certificates">
                Certificates
              </Link>
            </li>

          </>
        )}

        {role === "admin" && (
          <>

            <li>
              <Link to="/upload">
                Upload Course
              </Link>
            </li>

            <li>
              <Link to="/quiz-upload">
                Upload Quiz
              </Link>
            </li>

            <li>
              <Link to="/liveclass-upload">
                Add Class
              </Link>
            </li>

            <li>
              <Link to="/liveclasses">
                View Classes
              </Link>
            </li>

          </>
        )}

      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-buttons">

        {/* THEME BUTTON */}
        <button
          className="theme-btn"
          onClick={() => {
          const newMode =
            !darkMode;
          setDarkMode(newMode);
          if(newMode){
            document.body.classList.add(
              "dark"
            );
          } else {
            document.body.classList.remove(
              "dark"
            );
          }
        }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!role ? (
          <>

            <Link
              className="login-btn"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="signup-btn"
              to="/signup"
            >
              Sign Up
            </Link>

          </>
        ) : (

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        )}

      </div>

    </nav>
  );
}

export default Navbar;