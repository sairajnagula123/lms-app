import { useState } from "react";
import axios from "axios";
import "../styles/CourseUpload.css";

function CourseUpload() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [videos, setVideos] =
    useState([]);

  const [pdfs, setPdfs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const API_URL =
    process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append(
      "description",
      description
    );

    videos.forEach((video) => {

      formData.append(
        "videos",
        video
      );

    });

    pdfs.forEach((pdf) => {

      formData.append(
        "pdfs",
        pdf
      );

    });

    try {

      setLoading(true);

      setUploadProgress(0);

      setError("");

      setSuccess("");

      const response =
        await axios.post(
          `${API_URL}/api/courses/add`,
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

                setUploadProgress(
                  percent
                );

              },
          }
        );

      setSuccess(
        response.data.message
      );

      setTitle("");

      setDescription("");

      setVideos([]);

      setPdfs([]);

      setUploadProgress(0);

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

    <div className="page">

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

          {/* VIDEO UPLOAD */}
          <div className="upload-box">

            <label className="upload-label">
              🎥 Upload Videos
            </label>

            <input
              type="file"
              multiple
              accept="video/*"
              id="videoUpload"
              hidden
              onChange={(e) =>
                setVideos(
                  Array.from(
                    e.target.files
                  )
                )
              }
            />

            <label
              htmlFor="videoUpload"
              className="custom-upload-btn"
            >
              Choose Videos
            </label>

            <div className="selected-files">

              {videos.length > 0 ? (

                videos.map(
                  (video, index) => (

                    <div
                      key={index}
                      className="file-item"
                    >
                      🎥 {video.name}
                    </div>

                  )
                )

              ) : (

                <p className="empty-file">
                  No videos selected
                </p>

              )}

            </div>

          </div>

          {/* PDF UPLOAD */}
          <div className="upload-box">

            <label className="upload-label">
              📄 Upload PDFs
            </label>

            <input
              type="file"
              multiple
              accept="application/pdf"
              id="pdfUpload"
              hidden
              onChange={(e) =>
                setPdfs(
                  Array.from(
                    e.target.files
                  )
                )
              }
            />

            <label
              htmlFor="pdfUpload"
              className="custom-upload-btn"
            >
              Choose PDFs
            </label>

            <div className="selected-files">

              {pdfs.length > 0 ? (

                pdfs.map(
                  (pdf, index) => (

                    <div
                      key={index}
                      className="file-item"
                    >
                      📄 {pdf.name}
                    </div>

                  )
                )

              ) : (

                <p className="empty-file">
                  No PDFs selected
                </p>

              )}

            </div>

          </div>

          {/* PROGRESS BAR */}
          {loading && (

            <div className="progress-container">

              <div
                className="progress-bar"
                style={{
                  width:
                    `${uploadProgress}%`,
                }}
              >
                {uploadProgress}%
              </div>

            </div>

          )}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? `Uploading... ${uploadProgress}%`
              : "Upload Course"}

          </button>

        </form>

      </div>

    </div>

  );
}

export default CourseUpload;