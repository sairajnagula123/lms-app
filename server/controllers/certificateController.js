const Certificate = require("../models/Certificate");

// GENERATE CERTIFICATE
exports.generateCertificate = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      courseTitle,
    } = req.body;

    const cert = new Certificate({
      userName,
      userEmail,
      courseTitle,
      completedAt: new Date(),
    });

    await cert.save();

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