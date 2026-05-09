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

        const res = await axios.get(`${API_URL}/api/courses`);

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
    return (
      <div className="course-list-container">
        <h2 className="course-heading">Available Courses</h2>

        <div className="course-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="course-card shimmer-wrapper">
              
              <div className="shimmer-image shimmer"></div>

              <div className="course-content">
                <div className="shimmer-title shimmer"></div>

                <div className="shimmer-text shimmer"></div>
                <div className="shimmer-text shimmer"></div>
                <div className="shimmer-text short shimmer"></div>

                <div className="shimmer-buttons">
                  <div className="shimmer-btn shimmer"></div>
                  <div className="shimmer-btn shimmer"></div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-list-container">
        <h2 className="error-text">{error}</h2>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      <h2 className="course-heading">Available Courses</h2>

      {courses.length === 0 && (
        <p className="empty-text">No courses found</p>
      )}

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <div className="course-image">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                alt="course"
              />
            </div>

            <div className="course-content">
              <div className="course-title">
                {course.title}
              </div>

              <div className="course-desc">
                {course.description}
              </div>

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
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;