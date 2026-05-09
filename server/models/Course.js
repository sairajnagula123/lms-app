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

    // MULTIPLE VIDEOS
    videoUrls: [
      {
        title: String,
        url: String,
      },
    ],

    // MULTIPLE PDFS
    pdfUrls: [
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