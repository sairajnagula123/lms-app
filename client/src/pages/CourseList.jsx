import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CourseList.css"; // adjust path as needed

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>
      {courses.map((course) => (
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
            <Link to={`/quiz/${course._id}`} className="course-button quiz">
              Take Quiz
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList; // ✅ MAKE SURE YOU HAVE THIS LINE
