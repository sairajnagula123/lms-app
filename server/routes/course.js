const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Course = require("../models/Course");

router.post("/add", upload.single("file"), async (req, res) => {
  try {
    console.log("FILE:", req.file); // ✅ debug

    // ❌ if file not received
    if (!req.file) {
      return res.status(400).json({ message: "File not received" });
    }

    const { title, description, contentType } = req.body;

    const contentUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newCourse = new Course({
      title,
      description,
      contentType,
      contentUrl,
    });

    await newCourse.save();

    res.json({
      message: "Course uploaded successfully",
      course: newCourse
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;