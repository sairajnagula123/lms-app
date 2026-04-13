const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/course"));
app.use("/api/quizzes", require("./routes/quiz"));
app.use("/api/certificates", require("./routes/certificates"));

// Start server (keep LAST)
app.listen(process.env.PORT || 5000, () => {
  console.log("✅ Server running");
});