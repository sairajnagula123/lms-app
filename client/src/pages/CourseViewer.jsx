import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CourseViewer.css";

function CourseViewer() {

  const { id } = useParams();

  const [course, setCourse] =
    useState(null);

  const [activeSection, setActiveSection] =
    useState("video");

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

  // LOADING
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

        {/* VIDEO */}
        <div
          className={`lesson-item ${
            activeSection === "video"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("video")
          }
        >
          🎥 Video
        </div>

        {/* PDF */}
        <div
          className={`lesson-item ${
            activeSection === "pdf"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("pdf")
          }
        >
          📄 PDF Notes
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="course-main">

        {/* TOPBAR */}
        <div className="course-topbar">

          <div>

            <h1>{course.title}</h1>

            <p className="course-description">
              {course.description}
            </p>

          </div>

        </div>

        {/* VIDEO SECTION */}
        {activeSection === "video" && (

          <div>

            <h2 className="section-title">
              Course Video
            </h2>

            {course.videoUrl ? (

              <video
                className="video-player"
                controls
              >
                <source
                  src={course.videoUrl}
                  type="video/mp4"
                />

                Your browser does not
                support video.

              </video>

            ) : (

              <div className="empty-box">
                No video uploaded for
                this course.
              </div>

            )}

          </div>
        )}

        {/* PDF SECTION */}
        {activeSection === "pdf" && (

          <div>

            <h2 className="section-title">
              PDF Notes
            </h2>

            {course.pdfUrl ? (

              <iframe
                className="pdf-viewer"
                src={course.pdfUrl}
                title="PDF Viewer"
              ></iframe>

            ) : (

              <div className="empty-box">
                No PDF uploaded for
                this course.
              </div>

            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default CourseViewer;