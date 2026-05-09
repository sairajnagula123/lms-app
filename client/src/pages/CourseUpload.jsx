import { useState } from "react";
import axios from "axios";
import "../styles/CourseUpload.css";

function CourseUpload() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [video, setVideo] =
    useState(null);

  const [pdf, setPdf] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const API_URL =
    process.env.REACT_APP_API_URL;

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append(
      "description",
      description
    );

    if (video) {
      formData.append("video", video);
    }

    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const response = await axios.post(
        `${API_URL}/api/courses/add`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setSuccess(
        response.data.message
      );

      // RESET
      setTitle("");

      setDescription("");

      setVideo(null);

      setPdf(null);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="upload-container">

      <h2>
        📚 Upload New Course
      </h2>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {success && (
        <p className="success">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          required
        />

        {/* VIDEO */}
        <label>
          🎥 Upload Video
        </label>

        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            setVideo(
              e.target.files[0]
            )
          }
        />

        {/* PDF */}
        <label>
          📄 Upload PDF Notes
        </label>

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
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Upload Course"}
        </button>

      </form>
    </div>
  );
}

export default CourseUpload;