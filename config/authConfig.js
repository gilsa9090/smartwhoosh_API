const jwt = require("jsonwebtoken");

exports.generateToken = (userData) => {
  return jwt.sign({ userData }, "SecretKey", {
    expiresIn: "1h",
  });
};
