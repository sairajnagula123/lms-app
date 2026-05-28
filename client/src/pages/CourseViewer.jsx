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

  const [selectedPdf, setSelectedPdf] =
    useState("");

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

  if (!course) {

    return <h1>Loading...</h1>;
  }

  return (

    <div className="lms-layout">

      {/* SIDEBAR */}
      <div className="course-sidebar">

        <h2>LMS Course</h2>

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

        <h1>{course.title}</h1>

        <p>
          {course.description}
        </p>

        {/* VIDEOS */}
        {activeSection === "video" && (

          <div>

            <h2>
              Course Videos
            </h2>

            {course.videoUrls?.map(
              (video, index) => (

                <div
                  key={index}
                  className="media-box"
                >

                  <h3>
                    {video.title}
                  </h3>

                  <video
                    controls
                    width="100%"
                  >

                    <source
                      src={video.url}
                      type="video/mp4"
                    />

                  </video>

                </div>
              )
            )}

          </div>
        )}

        {/* PDFS */}
        {activeSection === "pdf" && (

          <div>

            <h2>
              PDF Notes
            </h2>

            {course.pdfUrls?.map(
              (pdf, index) => (

                <div
                  key={index}
                  className="media-box"
                >

                  <h3>
                    📄 {pdf.title}
                  </h3>

                  <button
                    className="open-pdf-btn"
                    onClick={() =>
                      setSelectedPdf(
                        pdf.url
                      )
                    }
                  >
                    View PDF
                  </button>

                  <a
                    href={`${pdf.url}?fl_attachment=true`}
                    className="download-pdf-btn"
                  >
                    Download PDF
                  </a>

                </div>
              )
            )}

            {/* PDF VIEWER */}
            {selectedPdf && (

              <div
                style={{
                  marginTop: "30px",
                }}
              >

                <iframe
                  src={selectedPdf}
                  title="PDF Viewer"
                  width="100%"
                  height="700px"
                />

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default CourseViewer;