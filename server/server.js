const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


// ✅ Create HTTP Server
const server = http.createServer(app);


// ✅ Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


// ✅ Socket Connection
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);


  // RECEIVE MESSAGE
  socket.on("send_message", (data) => {

    console.log("Message:", data);

    // SEND TO ALL USERS
    io.emit("receive_message", data);

  });


  socket.on("disconnect", () => {

    console.log("User disconnected");

  });

});


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
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});