import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const email =
          user?.email;

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/certificates/${email}`
        );

        setCerts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const downloadPDF = (cert) => {
    const doc = new jsPDF("landscape");

    // Border
    doc.rect(10, 10, 277, 190);

    // LMS Name
    doc.setFontSize(28);
    doc.text(
      "LMS PLATFORM",
      105,
      30
    );

    // Certificate Title
    doc.setFontSize(24);
    doc.text(
      "CERTIFICATE OF COMPLETION",
      75,
      50
    );

    // Body
    doc.setFontSize(16);
    doc.text(
      "This is to certify that",
      105,
      75
    );

    // Student Name
    doc.setFontSize(26);
    doc.text(
      cert.userName,
      105,
      95
    );

    // Course
    doc.setFontSize(16);
    doc.text(
      "has successfully completed the course",
      80,
      115
    );

    doc.setFontSize(22);
    doc.text(
      cert.courseTitle,
      95,
      130
    );

    // Date
    doc.setFontSize(14);
    doc.text(
      `Date: ${new Date(
        cert.completedAt
      ).toDateString()}`,
      20,
      170
    );

    // Certificate ID
    doc.text(
      `Certificate ID: ${cert._id.slice(
        -8
      )}`,
      20,
      180
    );

    // Signature
    doc.text(
      "Authorized Signature",
      210,
      170
    );

    doc.save(
      `${cert.courseTitle}_certificate.pdf`
    );
  };

  if (loading) {
    return <h2>Loading certificates...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Certificates</h2>

      {certs.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        certs.map((cert, i) => (
          <div
            key={i}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Course:</strong> {cert.courseTitle}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(cert.completedAt).toDateString()}
            </p>

            <button onClick={() => downloadPDF(cert)}>
              Download Certificate
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Certificates;