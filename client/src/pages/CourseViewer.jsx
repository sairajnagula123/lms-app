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

  // SHIMMER LOADING
  if (!course) {

    return (

      <div className="viewer-shimmer">

        <div className="shimmer-sidebar"></div>

        <div className="shimmer-main">

          <div className="shimmer-title"></div>

          <div className="shimmer-text"></div>

          <div className="shimmer-video"></div>

        </div>

      </div>
    );
  }

  return (

    <div className="lms-layout">

      {/* SIDEBAR */}
      <div className="course-sidebar">

        <h2>LMS Course</h2>

        {/* VIDEOS */}
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
          🎥 Videos
        </div>

        {/* PDFS */}
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

        {/* HEADER */}
        <div className="course-topbar">

          <div>

            <h1>
              {course.title}
            </h1>

            <p className="course-description">
              {course.description}
            </p>

          </div>

        </div>

        {/* VIDEO SECTION */}
        {activeSection === "video" && (

          <div>

            <h2 className="section-title">
              Course Videos
            </h2>

            {course.videoUrls &&
            course.videoUrls.length > 0 ? (

              course.videoUrls.map(
                (video, index) => (

                  <div
                    key={index}
                    className="media-box"
                  >

                    <h3>
                      🎥 {video.title}
                    </h3>

                    <video
                      className="video-player"
                      controls
                    >

                      <source
                        src={video.url}
                        type="video/mp4"
                      />

                    </video>

                  </div>
                )
              )

            ) : (

              <div className="empty-box">
                No videos uploaded.
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

            {course.pdfUrls &&
            course.pdfUrls.length > 0 ? (

              course.pdfUrls.map(
                (pdf, index) => (

                  <div
                    key={index}
                    className="media-box"
                  >

                    <h3>
                      📄 {pdf.title}
                    </h3>

                    <a
                      href={pdf.url.replace(
                        "/raw/upload/",
                        "/raw/upload/fl_attachment:false/"
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="open-pdf-btn"
                    >
                      Open PDF
                    </a>

                  </div>
                )
              )

            ) : (

              <div className="empty-box">
                No PDFs uploaded.
              </div>

            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default CourseViewer;