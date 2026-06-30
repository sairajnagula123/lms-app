const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const aiRoutes = require("./routes/aiRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ✅ Middleware FIRST
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// ✅ Then Routes
app.use("/api/ai", aiRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("LMS API is running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/liveclasses", require("./routes/liveClassRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});