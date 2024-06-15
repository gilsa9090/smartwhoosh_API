const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const UserController = require("../controller/loginController");
const authenticateToken = require("../config/verifyToken");

// Route to get all users
router.get("/users", UserController.getAllUsers);

router.put(
  "/profile/:id",
  authenticateToken,
  upload.single("image"),
  UserController.updateProfile
);


router.get("/users/total", UserController.getTotalUsers);

// Route to get user by ID
router.get("/users/:id", UserController.getUserById);

// Route to register a new user
router.post("/register", upload.single("image"), UserController.register);

// Route to login
router.post("/login", UserController.login);

// Route untuk memperbarui informasi pengguna
router.put(
  "/users/:id",
  authenticateToken,
  upload.single("image"),
  UserController.updateUserwithpass
);

router.delete("/users/:id", authenticateToken, UserController.deleteUser);


// Route to logout (assuming you have a middleware to handle authentication)
router.post("/logout", UserController.logout);

module.exports = router;
