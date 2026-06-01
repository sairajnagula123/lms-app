const express = require("express");
const router = express.Router();

const {
  register,
  login,
  googleLogin,
} = require("../controllers/authController");

router.post("/signup", register);

router.post("/login", login);

router.post("/google-login", googleLogin);

module.exports = router;