const Certificate = require("../models/Certificate");

// GENERATE CERTIFICATE
exports.generateCertificate = async (req, res) => {
  try {
    const { userEmail, courseTitle } =
      req.body;

    const existing =
      await Certificate.findOne({
        userEmail,
        courseTitle,
      });

    if (!existing) {
      await Certificate.create({
        userEmail,
        courseTitle,
        completedAt: new Date(),
      });
    }

    res.json({
      message:
        "Certificate generated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Error generating certificate.",
    });
  }
};

// GET USER CERTIFICATES
exports.getCertificates = async (
  req,
  res
) => {
  try {
    const certs =
      await Certificate.find({
        userEmail:
          req.params.email,
      });

    res.json(certs);
  } catch (err) {
    res.status(500).json({
      message:
        "Error fetching certificates.",
    });
  }
};