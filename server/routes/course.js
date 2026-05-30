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
    console.error("GET COURSES ERROR:", err);

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

      console.log("=================================");
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          message: "Title and description are required",
        });
      }

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

      console.log("Videos count:", videoUrls.length);
      console.log("PDF count:", pdfUrls.length);
      console.log("Reached before save");

      const newCourse = new Course({
        title,
        description,
        videoUrls,
        pdfUrls,
      });

      await newCourse.save();

      console.log("Saved successfully");

      res.status(201).json({
        message: "Course uploaded successfully",
        course: newCourse,
      });

    } catch (err) {

      console.log("=================================");
      console.log("UPLOAD ERROR");
      console.log("MESSAGE:", err.message);

      if (err.name) {
        console.log("NAME:", err.name);
      }

      if (err.code) {
        console.log("CODE:", err.code);
      }

      if (err.errors) {
        console.log("MONGOOSE ERRORS:", err.errors);
      }

      console.log("STACK:");
      console.log(err.stack);

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

    console.error("GET COURSE ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
});

module.exports = router;