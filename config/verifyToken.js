// middleware/auth.js

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModels"); // Sesuaikan dengan model pengguna Anda

module.exports = async (req, res, next) => {
  // Dapatkan token dari header Authorization
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    // Verifikasi token JWT
    const decoded = await promisify(jwt.verify)(token, "SecretKey");

    // Dapatkan userId dari payload token
    req.userId = decoded.userId;

    // Lanjutkan ke handler berikutnya
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
