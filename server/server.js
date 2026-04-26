const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();

// ✅ Create uploads folder if not exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ Middleware
app.use(cors({
  origin: "https://lms-app-xi-one.vercel.app", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ✅ Routes
const courseRoutes = require("./routes/course");
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("LMS API is running...");
});

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));