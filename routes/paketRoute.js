const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const paketController = require("../controller/paketController");

router.get("/paket", paketController.getAllPaket);

module.exports = router;
