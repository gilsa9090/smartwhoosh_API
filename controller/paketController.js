const Paket = require("../models/paketModels");
const path = require("path");
const fs = require("fs");

exports.getAllPaket = async (req, res) => {
  try {
    const paket = await Paket.findAll();
    const formatedPaket = paket.map((pk) => ({
      id: pk.id,
      nama_paket: pk.nama_paket,
      harga_paket: pk.harga_paket,
      image: `http://192.168.1.4:8000/${pk.image}`,
      deskripsi: pk.deskripsi,
      kd_paket: pk.kd_paket,
      createdAt: pk.createdAt,
      updateAt: pk.updatedAt,
    }));
    res.json(formatedPaket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalPaketCount = async (req, res) => {
  try {
    const totalPaket = await Paket.count();
    res.json({ totalPaket });
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

exports.getPaketById = async (req, res) => {
  try {
    const { id } = req.params;
    const paketId = await Paket.findByPk(id);

    if (!paketId) {
      return res.status(404).json({ error: "Paket Tidak ditemukan" });
    }

    const imageUrl = `http://192.168.1.4:3000/${paketId.image}`;

    res.json({ paketId, imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePaket = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_paket, harga_paket, deskripsi, kd_paket } = req.body;
    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    const paket = await Paket.findByPk(id);

    if (!paket) {
      return res.status(404).json({ error: "Paket tidak ada" });
    }

    if (image && paket.image) {
      const imagePath = path.join(__dirname, "../uploads/", paket.image);
      fs.unlinkSync(imagePath);
    }

    if (!image && paket.image) {
      image = paket.image;
    }

    await paket.update({
      nama_paket,
      harga_paket,
      deskripsi,
      kd_paket,
      image,
    });

    res.json({ message: "paket berhasil diperbarui", data: paket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePaket = async (req, res) => {
  try {
    const { id } = req.params;
    const paket = await Paket.findByPk(id);

    if (!paket) {
      return res.status(404).json({ error: "Paket tidak ditemukan" });
    }

    if (paket.image) {
      const imagePath = path.join(__dirname, "../uploads/", paket.image);
      fs.unlinkSync(imagePath);
    }

    await paket.destroy();

    res.json({ message: "paket berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
