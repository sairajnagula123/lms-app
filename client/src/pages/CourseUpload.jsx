import { useState } from "react";
import axios from "axios";
import "../styles/CourseUpload.css";

function CourseUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("video");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("contentType", contentType);
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post(
        `${API_URL}/api/courses/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(response.data.message || "Course uploaded successfully!");

      // Reset Form
      setTitle("");
      setDescription("");
      setContentType("video");
      setFile(null);

    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.message || "Upload failed");
      } else {
        setError("Server error or network issue");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="page">

    <div className="upload-container">

      <h2>📚 Upload a New Course</h2>

      {error && <p className="error">{error}</p>}

      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        >
          <option value="video">🎥 Video</option>
          <option value="pdf">📄 PDF</option>
        </select>

        <div className="file-upload">
          <input
            type="file"
            accept="video/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        {file && (
          <p className="file-name">
            ✅ Selected File: {file.name}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="loader"></span>
          ) : (
            "Upload Course"
          )}
        </button>

      </form>

    </div>

  </div>
);
}

export default CourseUpload;