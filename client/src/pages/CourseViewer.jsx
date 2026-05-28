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

    const fetchCourse =
      async () => {

        try {

          const API_URL =
            process.env.REACT_APP_API_URL;

          const res =
            await axios.get(
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

    return <h1>Loading...</h1>;
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

      {/* MAIN */}
      <div className="course-main">

        <h1>
          {course.title}
        </h1>

        <p>
          {course.description}
        </p>

        {/* VIDEOS */}
        {activeSection === "video" && (

          <div>

            <h2>
              Course Videos
            </h2>

            {course.videoUrls?.length > 0 ? (

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
                      controls
                      className="video-player"
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

        {/* PDFS */}
        {activeSection === "pdf" && (

          <div>

            <h2>
              PDF Notes
            </h2>

            {course.pdfUrls?.length > 0 ? (

              course.pdfUrls.map(
                (pdf, index) => (

                  <div
                    key={index}
                    className="media-box"
                  >

                    <h3>
                      📄 {pdf.title}
                    </h3>

                    <div className="pdf-buttons">

                      {/* VIEW PDF */}
                      <a
                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(pdf.url)}&embedded=true`}
                        target="_blank"
                        rel="noreferrer"
                        className="open-pdf-btn"
                      >
                        View PDF
                      </a>

                      {/* DOWNLOAD PDF */}
                      <a
                        href={`${pdf.url}?fl_attachment=true`}
                        className="download-pdf-btn"
                      >
                        Download PDF
                      </a>

                    </div>

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