const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Course = require("../models/Course");


// =========================
// GET ALL COURSES
// =========================

router.get("/", async (req, res) => {
  try {

    const courses = await Course.find().sort({
      createdAt: -1,
    });

    res.json(courses);

  } catch (err) {

    console.error("FETCH ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
});


// =========================
// GET SINGLE COURSE
// =========================

router.get("/:id", async (req, res) => {
  try {

    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);

  } catch (err) {

    console.error(
      "FETCH SINGLE ERROR:",
      err
    );

    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
});


// =========================
// ADD COURSE
// =========================

router.post(
  "/add",

  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },

    {
      name: "pdf",
      maxCount: 1,
    },
  ]),

  async (req, res) => {

    try {

      const {
        title,
        description,
      } = req.body;

      // VIDEO URL
      const videoUrl =
        req.files?.video?.[0]?.path || "";

      // PDF URL
      const pdfUrl =
        req.files?.pdf?.[0]?.path || "";

      const newCourse = new Course({
        title,
        description,
        videoUrl,
        pdfUrl,
      });

      await newCourse.save();

      res.json({
        message:
          "Course uploaded successfully",

        course: newCourse,
      });

    } catch (err) {

      console.error(
        "UPLOAD ERROR:",
        err
      );

      res.status(500).json({
        message: "Upload failed",
        error: err.message,
      });
    }
  }
);

module.exports = router;