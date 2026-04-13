const express = require("express");
const router = express.Router();
const multer = require("multer");
const Course = require("../models/Course");
const path = require("path");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST: Upload course with file
router.post("/add", upload.single("file"), async (req, res) => {
  const { title, description, contentType } = req.body;

  try {
    const contentUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const course = new Course({ title, description, contentType, contentUrl });
    await course.save();
    res.json({ message: "Course uploaded", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload course" });
  }
});

// GET: All courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

module.exports = router;
