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

  const [videoProgress, setVideoProgress] =
    useState(0);

  const [pdfProgress, setPdfProgress] =
    useState(0);

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
      setVideoProgress(0);

      const res =
        await axios.post(
          `${API_URL}/api/courses/${selectedCourse}/video`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },

            onUploadProgress:
              (progressEvent) => {

                const percent =
                  Math.round(
                    (
                      progressEvent.loaded *
                      100
                    ) /
                    progressEvent.total
                  );

                setVideoProgress(
                  percent
                );

              },
          }
        );

      setMessage(
        res.data.message
      );

      setVideoProgress(100);

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
      setPdfProgress(0);

      const res =
        await axios.post(
          `${API_URL}/api/courses/${selectedCourse}/pdf`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },

            onUploadProgress:
              (progressEvent) => {

                const percent =
                  Math.round(
                    (
                      progressEvent.loaded *
                      100
                    ) /
                    progressEvent.total
                  );

                setPdfProgress(
                  percent
                );

              },
          }
        );

      setMessage(
        res.data.message
      );

      setPdfProgress(100);

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

        {videoProgress > 0 && (

          <div
            style={{
              marginTop: "10px",
            }}
          >

            <p>
              Uploading Video:
              {" "}
              {videoProgress}%
            </p>

            <progress
              value={videoProgress}
              max="100"
              style={{
                width: "100%",
              }}
            />

          </div>

        )}

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

        {pdfProgress > 0 && (

          <div
            style={{
              marginTop: "10px",
            }}
          >

            <p>
              Uploading PDF:
              {" "}
              {pdfProgress}%
            </p>

            <progress
              value={pdfProgress}
              max="100"
              style={{
                width: "100%",
              }}
            />

          </div>

        )}

      </div>

    </div>

  );
}

export default UploadContent;