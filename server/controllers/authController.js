const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// ✅ REGISTER (Signup)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // ❌ no role from frontend

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Always assign role from backend (secure)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user" // default role
    });

    await user.save();

    res.status(201).json({ msg: "Signup successful" });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Create token (include role)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ IMPORTANT: Send role separately (frontend needs this)
    res.json({
      token,
      role: user.role, // ⭐ FIXED
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};