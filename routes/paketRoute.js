const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const paketController = require("../controller/paketController");

router.get("/paket", paketController.getAllPaket);
router.post("/paket", upload.single("image"), paketController.createPaket);

module.exports = router;
