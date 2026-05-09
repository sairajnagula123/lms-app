import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/CourseList.css";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;

        console.log("API:", API_URL);

        const res = await axios.get(`${API_URL}/api/courses`);

        console.log("Courses:", res.data);

        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <h2>Loading courses...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>

      {courses.length === 0 && <p>No courses found</p>}

      {courses.map((course) => (
        <div key={course._id} className="course-card">
          <div className="course-title">{course.title}</div>

          <div className="course-desc">
            {course.description}
          </div>

          <div className="course-buttons">
            <a
              href={course.contentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
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