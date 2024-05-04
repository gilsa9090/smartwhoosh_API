const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are has no token" });
  }

  jwt.verify(token, "SecretKey", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Authenticate Token Fails" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
