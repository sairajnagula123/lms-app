import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CourseViewer.css";

function CourseViewer() {
  const { id } = useParams();

  const [course, setCourse] =
    useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const API_URL =
          process.env.REACT_APP_API_URL;

        const res = await axios.get(
          `${API_URL}/api/courses/${id}`
        );

        setCourse(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return (
      <div className="viewer-loading">
        Loading Course...
      </div>
    );
  }

  return (
    <div className="lms-layout">

      {/* SIDEBAR */}
      <div className="course-sidebar">

        <h2>LMS Course</h2>

        <div className="lesson-item active">
          📘 {course.title}
        </div>

        <div className="lesson-item">
          ✅ Quiz
        </div>

        <div className="lesson-item">
          📜 Certificate
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="course-main">

        {/* TOPBAR */}
        <div className="course-topbar">

          <h1>{course.title}</h1>

          <button>
            Mark Complete
          </button>

        </div>

        {/* DESCRIPTION */}
        <div className="course-description">
          {course.description}
        </div>

        {/* VIDEO */}
        {course.contentType ===
          "video" && (
          <video
            className="video-player"
            controls
          >
            <source
              src={course.contentUrl}
              type="video/mp4"
            />
          </video>
        )}

        {/* PDF */}
        {course.contentType ===
          "pdf" && (
          <object
            data={course.contentUrl}
            type="application/pdf"
            width="100%"
            height="800px"
            className="pdf-viewer"
          >
            <p>
              PDF cannot be displayed.
            </p>
          </object>
        )}

      </div>
    </div>
  );
}

export default CourseViewer;