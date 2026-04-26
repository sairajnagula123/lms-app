import { useEffect, useState } from "react";
import jsPDF from "jspdf";

function Certificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL.VITE_API_URL}/api/certificates/${localStorage.getItem("email")}`)
      .then(res => res.json())
      .then(data => setCerts(data));
  }, []);

  const downloadPDF = (cert) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Certificate of Completion", 60, 40);
    doc.setFontSize(14);
    doc.text(`This certifies that ${cert.userEmail}`, 40, 60);
    doc.text(`has completed the course "${cert.courseTitle}"`, 40, 75);
    doc.text(`on ${new Date(cert.completedAt).toDateString()}`, 40, 90);
    doc.save(`${cert.courseTitle}_certificate.pdf`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Certificates</h2>
      {certs.map((cert, i) => (
        <div key={i} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <p><strong>Course:</strong> {cert.courseTitle}</p>
          <p><strong>Date:</strong> {new Date(cert.completedAt).toDateString()}</p>
          <button onClick={() => downloadPDF(cert)}>Download Certificate</button>
        </div>
      ))}
    </div>
  );
}

export default Certificates;
