const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const paketController = require("../controller/paketController");

router.get("/paket", paketController.getAllPaket);
router.get("/paket/total", paketController.getTotalPaketCount);
router.post("/paket", upload.single("image"), paketController.createPaket);
router.get("/paket/:id", paketController.getPaketById);
router.put("/paket/:id", upload.single("image"), paketController.updatePaket);
router.delete("/paket/:id", paketController.deletePaket);

module.exports = router;
