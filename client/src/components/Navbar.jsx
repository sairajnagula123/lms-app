import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [role, setRole] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");

    // optional: restore theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.clear();
    setRole("");
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">🎓 MyLMS</div>

      {/* LINKS */}
      <ul className="nav-links">

        <li><Link to="/">Home</Link></li>

        {!role && (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {role === "user" && (
          <>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/liveclasses">Live Classes</Link></li>
            <li><Link to="/certificates">Certificates</Link></li>
          </>
        )}

        {role === "admin" && (
          <>
            <li><Link to="/upload">Upload Course</Link></li>
            <li><Link to="/quiz-upload">Upload Quiz</Link></li>
            <li><Link to="/liveclass-upload">Add Class</Link></li>
            <li><Link to="/liveclasses">View Classes</Link></li>
          </>
        )}

      </ul>

      {/* RIGHT SIDE BUTTONS */}
      <div className="nav-buttons">

        {/* 🌙 DARK MODE TOGGLE */}
        <button
          className="theme-btn"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!role ? (
          <>
            <Link className="login-btn" to="/login">Login</Link>
            <Link className="signup-btn" to="/signup">Sign Up</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;