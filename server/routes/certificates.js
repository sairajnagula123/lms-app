const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");

router.post("/generate", async (req, res) => {
  const { userEmail, courseTitle } = req.body;

  try {
    const cert = new Certificate({
      userEmail,
      courseTitle,
      completedAt: new Date()
    });
    await cert.save();
    res.json({ message: "Certificate generated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error generating certificate." });
  }
});

router.get("/:email", async (req, res) => {
  const certs = await Certificate.find({ userEmail: req.params.email });
  res.json(certs);
});

module.exports = router;
