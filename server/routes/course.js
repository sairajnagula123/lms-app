const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Course = require("../models/Course");


// ==========================
// GET ALL COURSES
// ==========================
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({
      createdAt: -1,
    });

    res.json(courses);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
});


// ==========================
// ADD COURSE
// ==========================
router.post(
  "/add",
  upload.fields([
    {
      name: "videos",
      maxCount: 10,
    },
    {
      name: "pdfs",
      maxCount: 10,
    },
  ]),

  async (req, res) => {
    try {

      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const { title, description } = req.body;

      const videoUrls =
        req.files?.videos?.map((file) => ({
          title: file.originalname,
          url: file.path,
        })) || [];

      const pdfUrls =
        req.files?.pdfs?.map((file) => ({
          title: file.originalname,
          url: file.path,
        })) || [];

      const newCourse = new Course({
        title,
        description,
        videoUrls,
        pdfUrls,
      });

      await newCourse.save();

      res.status(201).json({
        message: "Course uploaded successfully",
        course: newCourse,
      });

    } catch (err) {

      console.error("UPLOAD ERROR:", err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// ==========================
// GET SINGLE COURSE
// ==========================
router.get("/:id", async (req, res) => {
  try {

    const course =
      await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
});

module.exports = router;