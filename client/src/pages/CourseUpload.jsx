import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "../styles/CourseUpload.css";

function CourseUpload() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("video");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // DRAG & DROP
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [],
      "application/pdf": [],
    },
  });

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (contentType === "pdf" && file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    if (contentType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a video file");
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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess(response.data.message || "Course uploaded successfully!");

      // RESET FORM
      setTitle("");
      setDescription("");
      setContentType("video");
      setFile(null);

    } catch (err) {

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
    <div className={darkMode ? "page dark" : "page"}>

      {/* DARK MODE TOGGLE */}
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <div className="upload-container">

        <h2>📚 Upload New Course</h2>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* CONTENT TYPE */}
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="video">🎥 Video</option>
            <option value="pdf">📄 PDF</option>
          </select>

          {/* DROPZONE */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />

            <p>Drag & Drop Course File Here</p>

            <span>or click to browse</span>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Course"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default CourseUpload;