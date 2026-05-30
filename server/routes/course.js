const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Course = require("../models/Course");


// ==========================
// CREATE COURSE
// ==========================
router.post("/add", async (req, res) => {

  try {

    const { title, description } = req.body;

    if (!title || !description) {

      return res.status(400).json({
        message: "Title and Description required",
      });

    }

    const course = new Course({
      title,
      description,
      videoUrls: [],
      pdfUrls: [],
    });

    await course.save();

    res.status(201).json({
      message: "Course created successfully",
      course,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// ==========================
// ADD VIDEO TO COURSE
// ==========================
router.post(
  "/:id/video",

  upload.single("video"),

  async (req, res) => {

    try {

      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {

        return res.status(404).json({
          message: "Course not found",
        });

      }

      course.videoUrls.push({
        title: req.file.originalname,
        url: req.file.path,
      });

      await course.save();

      res.json({
        message:
          "Video uploaded successfully",
        course,
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);


// ==========================
// ADD PDF TO COURSE
// ==========================
router.post(
  "/:id/pdf",

  upload.single("pdf"),

  async (req, res) => {

    try {

      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {

        return res.status(404).json({
          message: "Course not found",
        });

      }

      course.pdfUrls.push({
        title: req.file.originalname,
        url: req.file.path,
      });

      await course.save();

      res.json({
        message:
          "PDF uploaded successfully",
        course,
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);


// ==========================
// GET ALL COURSES
// ==========================
router.get("/", async (req, res) => {

  try {

    const courses =
      await Course.find().sort({
        createdAt: -1,
      });

    res.json(courses);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// ==========================
// GET SINGLE COURSE
// ==========================
router.get("/:id", async (req, res) => {

  try {

    const course =
      await Course.findById(
        req.params.id
      );

    if (!course) {

      return res.status(404).json({
        message: "Course not found",
      });

    }

    res.json(course);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;