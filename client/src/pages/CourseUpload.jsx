import { useState } from "react";
import "../styles/CourseUpload.css";


function CourseUpload() {
  console.log("API URL:", import.meta.env.VITE_API_URL); // 👈 ADD HERE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("Video");
  const [file, setFile] = useState(null);

  const API_URL = "https://lms-app-cqbr.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("contentType", contentType);
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/courses/add`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a New Course</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course Description" required />
        <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
          <option value="Video">Video</option>
          <option value="PDF">PDF</option>
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="video/*,application/pdf" required />
        <button type="submit">Upload Course</button>
      </form>
    </div>
  );
}

export default CourseUpload;
