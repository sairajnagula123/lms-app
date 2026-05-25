import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar">

      <div className="navbar-brand">
        MyLMS
      </div>

      <ul className="navbar-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Before Login */}
        {!role && (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        {/* User Navbar */}
        {role === "user" && (
          <>
            <li>
              <Link to="/courses">Courses</Link>
            </li>

            <li>
              <Link to="/liveclasses">Live Classes</Link>
            </li>

            <li>
              <Link to="/certificates">My Certificates</Link>
            </li>
          </>
        )}

        {/* Admin Navbar */}
        {role === "admin" && (
          <>
            <li>
              <Link to="/upload">Upload Course</Link>
            </li>

            <li>
              <Link to="/quiz-upload">Upload Quiz</Link>
            </li>

            <li>
              <Link to="/liveclass-upload">
                Add Live Class
              </Link>
            </li>

            <li>
              <Link to="/liveclasses">
                View Classes
              </Link>
            </li>
          </>
        )}

        {/* Logout */}
        {role && (
          <li>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </li>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;