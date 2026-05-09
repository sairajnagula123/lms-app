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
        const email = localStorage.getItem("email");

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
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Certificate of Completion", 45, 40);

    doc.setFontSize(14);
    doc.text(`This certifies that`, 20, 70);
    doc.text(`${cert.userEmail}`, 20, 85);

    doc.text(`has successfully completed the course`, 20, 105);

    doc.text(`"${cert.courseTitle}"`, 20, 120);

    doc.text(
      `Completed on: ${new Date(cert.completedAt).toDateString()}`,
      20,
      145
    );

    doc.save(`${cert.courseTitle}_certificate.pdf`);
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