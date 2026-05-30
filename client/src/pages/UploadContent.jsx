import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UploadContent.css";

function UploadContent() {

  const API_URL =
    process.env.REACT_APP_API_URL;

  const [courses, setCourses] =
    useState([]);

  const [selectedCourse, setSelectedCourse] =
    useState("");

  const [video, setVideo] =
    useState(null);

  const [pdf, setPdf] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/courses`
          );

        setCourses(res.data);

      } catch (err) {

        console.log(err);

        setError(
          "Failed to load courses"
        );

      }

    };

    fetchCourses();

  }, [API_URL]);

  const uploadVideo = async () => {

    if (
      !selectedCourse ||
      !video
    ) {

      setError(
        "Select a course and video"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "video",
      video
    );

    try {

      setError("");
      setMessage("");

      const res =
        await axios.post(
          `${API_URL}/api/courses/${selectedCourse}/video`,
          formData
        );

      setMessage(
        res.data.message
      );

      setVideo(null);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Video upload failed"
      );

    }

  };

  const uploadPdf = async () => {

    if (
      !selectedCourse ||
      !pdf
    ) {

      setError(
        "Select a course and PDF"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "pdf",
      pdf
    );

    try {

      setError("");
      setMessage("");

      const res =
        await axios.post(
          `${API_URL}/api/courses/${selectedCourse}/pdf`,
          formData
        );

      setMessage(
        res.data.message
      );

      setPdf(null);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "PDF upload failed"
      );

    }

  };

  return (

    <div className="page">

      <div className="upload-content-container">

        <h2>
          📚 Upload Course Content
        </h2>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {message && (
          <p className="success">
            {message}
          </p>
        )}

        <select
          value={selectedCourse}
          onChange={(e) =>
            setSelectedCourse(
              e.target.value
            )
          }
        >

          <option value="">
            Select Course
          </option>

          {courses.map(
            (course) => (

              <option
                key={course._id}
                value={course._id}
              >
                {course.title}
              </option>

            )
          )}

        </select>

        <h3>
          🎥 Upload Video
        </h3>

        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            setVideo(
              e.target.files[0]
            )
          }
        />

        <button
          className="upload-btn"
          onClick={uploadVideo}
        >
          Upload Video
        </button>

        <h3>
          📄 Upload PDF
        </h3>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setPdf(
              e.target.files[0]
            )
          }
        />

        <button
          className="upload-btn"
          onClick={uploadPdf}
        >
          Upload PDF
        </button>

      </div>

    </div>

  );
}

export default UploadContent;