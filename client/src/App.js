import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

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
import Navbar from "./components/Navbar";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./styles/Navbar.css";

function App() {

  return (

    <Router>

      {/* GLOBAL TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
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

        {/* ADMIN */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <CourseUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz-upload"
          element={
            <ProtectedRoute>
              <QuizUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/liveclass-upload"
          element={
            <ProtectedRoute>
              <LiveClassUpload />
            </ProtectedRoute>
          }
        />

        {/* USER */}
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
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseViewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/liveclasses"
          element={
            <ProtectedRoute>
              <LiveClasses />
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;