import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CourseList.css";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const API_URL = "https://lms-app-cqbr.onrender.com"; // ✅ HARDCODE

    console.log("Fetching from:", API_URL);

    fetch(`${API_URL}/api/courses`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Courses:", data); // ✅ debug
        setCourses(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>

      {/* ✅ Optional: show message if empty */}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map((course) => (
          <div key={course._id} className="course-card">
            <div className="course-title">{course.title}</div>
            <div className="course-desc">{course.description}</div>
            <div className="course-buttons">
              <a
                href={course.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="course-button view"
              >
                View Content
              </a>

              <Link
                to={`/quiz/${course._id}`}
                className="course-button quiz"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CourseList;