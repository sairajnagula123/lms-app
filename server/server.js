const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


// ✅ Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());


// ✅ Static Upload Folder
app.use("/uploads", express.static("uploads"));


// ✅ Root Route
app.get("/", (req, res) => {
  res.send("LMS API is running...");
});


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/courses", require("./routes/course"));

app.use("/api/quizzes", require("./routes/quiz"));

app.use("/api/certificates", require("./routes/certificates"));


// ✅ LIVE CLASSES ROUTE
app.use("/api/liveclasses", require("./routes/liveClassRoutes"));


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});