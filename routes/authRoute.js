const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const authController = require("../controller/loginController");
const verifyToken = require("../config/verifyToken");

router.get("/user", authController.getAllUsers);
router.get("/user/:id", verifyToken, authController.getUserById);
router.post("/register", upload.single("image"), authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
