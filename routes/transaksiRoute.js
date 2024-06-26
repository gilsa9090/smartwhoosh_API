const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const transaksiController = require("../controller/transaksiController");

router.get("/transaksi", transaksiController.getAllTransaksi);
router.get("/transaksi/total", transaksiController.getCountTransaksi);
router.get("/transaksi/harga", transaksiController.getTotalHargaSemuaTransaksi);
router.post("/transaksi", transaksiController.createTransaksi2);
router.get("/transaksi/:id", transaksiController.getTransaksiById);
router.put("/transaksi/:id", transaksiController.updateTransaksiStatus);
router.delete("/transaksi/:id", transaksiController.deleteTransaksi);

module.exports = router;
