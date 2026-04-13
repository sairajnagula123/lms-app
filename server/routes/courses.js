const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Course = require("../models/Course");

router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { title, description, contentType } = req.body;

    const contentUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const newCourse = new Course({
      title,
      description,
      contentType,
      contentUrl,
    });

    await newCourse.save();
    res.json({ message: "Course uploaded successfully", course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
