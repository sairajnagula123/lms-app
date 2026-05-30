import { useState } from "react";
import axios from "axios";
import "../styles/CourseUpload.css";

function CourseUpload() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const API_URL =
    process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const response =
        await axios.post(
          `${API_URL}/api/courses/add`,
          {
            title,
            description,
          }
        );

      setSuccess(
        response.data.message
      );

      setTitle("");

      setDescription("");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to create course"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="page">

      <div className="upload-container">

        <h2>
          📚 Create New Course
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

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

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

          <button
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Creating..."
                : "Create Course"
            }
          </button>

        </form>

      </div>

    </div>

  );
}

export default CourseUpload;