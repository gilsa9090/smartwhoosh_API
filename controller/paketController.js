const Paket = require("../models/paketModels");
const path = require("path");

exports.getAllPaket = async (req, res) => {
  try {
    const paket = await Paket.findAll();
    res.json(paket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
