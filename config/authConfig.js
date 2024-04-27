const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email }, "your_secret_Key", {
    expiresIn: "1h",
  });
};
