import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CourseUpload from "./pages/CourseUpload";
import CourseList from "./pages/CourseList";
import QuizUpload from "./pages/QuizUpload";
import Quiz from "./pages/Quiz";
import Certificates from "./pages/Certificates";
import CourseViewer from "./pages/CourseViewer";
import LiveClasses from "./pages/LiveClasses";
import LiveClassUpload from "./pages/LiveClassUpload";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/Navbar.css";

function App() {

  const role = localStorage.getItem("role");

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Navbar */}
      <nav className="navbar">

        <div className="navbar-brand">
          MyLMS
        </div>

        <ul className="navbar-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          {/* ✅ Before Login */}
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

          {/* ✅ User Navbar */}
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

          {/* ✅ Admin Navbar */}
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

          {/* ✅ Logout */}
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

      {/* ✅ Routes */}
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/upload"
          element={<CourseUpload />}
        />

        <Route
          path="/quiz-upload"
          element={<QuizUpload />}
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:courseId"
          element={<Quiz />}
        />

        <Route
          path="/certificates"
          element={<Certificates />}
        />

        <Route
          path="/course/:id"
          element={<CourseViewer />}
        />

        {/* ✅ Live Classes */}
        <Route
          path="/liveclasses"
          element={<LiveClasses />}
        />

        {/* ✅ Add Live Class */}
        <Route
          path="/liveclass-upload"
          element={<LiveClassUpload />}
        />

      </Routes>

    </Router>
  );
}

export default App;