import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CourseList.css";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    console.log("API:", API_URL);

    fetch(`${API_URL}/api/courses`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Courses:", data);
        setCourses(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>

      {courses.length === 0 && <p>No courses found</p>}

      {courses.map((course) => (
        <div key={course._id} className="course-card">
          <div className="course-title">{course.title}</div>
          <div className="course-desc">{course.description}</div>

          <div className="course-buttons">
            <a href={course.contentUrl} target="_blank" rel="noopener noreferrer">
              View Content
            </a>

            <Link to={`/quiz/${course._id}`}>
              Take Quiz
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;