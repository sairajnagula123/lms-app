const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// ✅ SIGNUP (SECURE)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body; // ❌ removed role

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ ALWAYS set role from backend
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user" // 🔒 fixed (no admin from frontend)
    });

    await user.save();

    res.status(201).json({ msg: "Signup successful" });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


// ✅ LOGIN (CLEAN + CONSISTENT)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // create token (include role for future use)
    const token = jwt.sign(
      { id: user._id, role: user.role }, // ✅ include role
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // send response
    res.json({
      token,
      role: user.role, // ✅ consistent with frontend
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


module.exports = router;