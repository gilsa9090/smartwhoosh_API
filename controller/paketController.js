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

exports.createPaket = async (req, res) => {
  try {
    const { nama_paket, harga_paket, deskripsi, kd_paket } = req.body;
    const image = req.file.filename;

    if (!nama_paket && !harga_paket && !kd_paket) {
      return res
        .status(400)
        .json({ message: "nama, harga, or kode is required" });
    }

    const newPaket = await Paket.create({
      nama_paket,
      harga_paket,
      deskripsi,
      kd_paket,
      image,
    });

    res
      .status(201)
      .json({ message: "New Paket Successfully Created", data: newPaket });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
