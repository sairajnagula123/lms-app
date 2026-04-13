import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CourseUpload from "./pages/CourseUpload";
import CourseList from "./pages/CourseList";
import QuizUpload from "./pages/QuizUpload";
import Quiz from "./pages/Quiz";
import Certificates from "./pages/Certificates";
import "./styles/Navbar.css"; // Make sure this exists


function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">MyLMS</div>
        <ul className="navbar-links">
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
              <li><Link to="/certificates">My Certificates</Link></li> {/* ✅ New */}
            </>
          )}

          {role === "admin" && (
            <>
              <li><Link to="/upload">Upload Course</Link></li>
              <li><Link to="/quiz-upload">Upload Quiz</Link></li>
            </>
          )}

          {role && (
            <li>
              <button onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}>Logout</button>
            </li>
          )}
        </ul>
      </nav>

      {/* ✅ App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<CourseUpload />} />
        <Route path="/quiz-upload" element={<QuizUpload />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
    </Router>
  );
}

export default App;
