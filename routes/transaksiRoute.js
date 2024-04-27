const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const transaksiController = require("../controller/transaksiController");

router.get("/transaksi", transaksiController.getAllTransaksi);

module.exports = router;
