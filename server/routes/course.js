const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Course = require("../models/Course");

router.post("/add", upload.single("file"), async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File not received" });
    }

    const { title, description, contentType } = req.body;

    // ✅ Cloudinary URL directly from multer
    const contentUrl = req.file.path;

    const newCourse = new Course({
      title,
      description,
      contentType,
      contentUrl,
    });

    await newCourse.save();

    res.json({
      message: "Course uploaded successfully",
      course: newCourse,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;