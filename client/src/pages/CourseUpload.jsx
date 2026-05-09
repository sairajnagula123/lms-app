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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = process.env.REACT_APP_API_URL;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("contentType", contentType);
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${API_URL}/api/courses/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      // Optional reset after upload
      setTitle("");
      setDescription("");
      setContentType("video");
      setFile(null);

    } catch (err) {
      console.error("Upload failed:", err);

      if (err.response) {
        setError(err.response.data.message || "Upload failed");
      } else {
        setError("Server error / Network issue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a New Course</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course Title"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course Description"
          required
        />

        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        >
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="video/*,application/pdf"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Course"}
        </button>

      </form>
    </div>
  );
}

export default CourseUpload;