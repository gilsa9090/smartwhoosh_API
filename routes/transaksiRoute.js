const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const transaksiController = require("../controller/transaksiController");

router.get("/transaksi", transaksiController.getAllTransaksi);
router.post("/transaksi", transaksiController.createTransaksi);
router.get("/transaksi/:id", transaksiController.getTransaksiById);
router.put("/transaksi/:id", transaksiController.updateTransaksi);
router.delete("/transaksi/:id", transaksiController.deleteTransaksi);

module.exports = router;
