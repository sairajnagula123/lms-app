const mongoose = require("mongoose");

const courseSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // VIDEO
    videoUrl: {
      type: String,
      default: "",
    },

    // PDF NOTES
    pdfUrl: {
      type: String,
      default: "",
    },

    // OPTIONAL FUTURE
    resources: [
      {
        title: String,
        url: String,
      },
    ],

    createdBy: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model(
  "Course",
  courseSchema
);