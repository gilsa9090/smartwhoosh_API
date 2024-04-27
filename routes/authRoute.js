const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const authController = require("../controller/loginController");

router.get("/user", authController.getAllUsers);
router.get("/user/:id", authController.getUserById);
router.post("/register", upload.single("image"), authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
