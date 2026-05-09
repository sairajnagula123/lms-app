import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/CourseViewer.css";
import axios from "axios";

function CourseViewer() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;

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

  // Loading
  if (!course) {
    return (
      <div className="viewer-loading">
        Loading course...
      </div>
    );
  }

  return (
    <div className="course-viewer-container">
      <div className="viewer-card">

        <h1 className="viewer-title">
          {course.title}
        </h1>

        <p className="viewer-description">
          {course.description}
        </p>

        {/* VIDEO PLAYER */}
        {course.contentType === "video" && (
          <video
            className="video-player"
            controls
          >
            <source
              src={course.contentUrl}
              type="video/mp4"
            />

            Your browser does not support video.
          </video>
        )}

        {/* PDF VIEWER */}
        {course.contentType === "pdf" && (
          <iframe
            className="pdf-viewer"
            src={course.contentUrl.replace(
              "/upload/",
              "/upload/fl_attachment:false/"
            )}
            title="PDF Viewer"
          ></iframe>
        )}

      </div>
    </div>
  );
}

export default CourseViewer;