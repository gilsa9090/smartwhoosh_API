const Transaksi = require("../models/transaksiModel");

exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
