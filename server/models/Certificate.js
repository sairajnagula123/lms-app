const mongoose = require("mongoose");

const certificateSchema =
  new mongoose.Schema({
    userName: String,
    userEmail: String,
    courseTitle: String,
    completedAt: Date,
  });

module.exports =
  mongoose.model(
    "Certificate",
    certificateSchema
  );