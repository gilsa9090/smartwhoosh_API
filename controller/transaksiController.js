const Paket = require("../models/paketModels");
const User = require("../models/userModels");
const Transaksi = require("../models/transaksiModel");

exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransaksi = async (req, res) => {
  try {
    const {
      nama_pelanggan,
      berat,
      tanggal_masuk,
      tanggal_keluar,
      total_harga,
      status,
      kasir_id,
      nama_paket,
    } = req.body;

    if (!nama_pelanggan && !berat) {
      return res.status(400).json({ error: "Nama and Berat is required" });
    }

    const newTransaksi = await Transaksi.create({
      nama_pelanggan,
      berat,
      tanggal_masuk,
      tanggal_keluar,
      total_harga,
      status,
      kasir_id,
      nama_paket,
    });

    res
      .status(201)
      .json({ message: "Transaksi berhasil dibuat", data: newTransaksi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransaksiById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaksi = await Transaksi.findByPk(id, {
      include: [
        {
          model: Paket,
          as: "paket",
          attributes: ["nama_paket"], // Menampilkan hanya atribut nama_paket dari tabel Paket
        },
        {
          model: User,
          as: "kasir",
          attributes: ["nama"],
        },
      ],
    });

    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi Tidak ditemukan" });
    }

    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nama_pelanggan,
      berat,
      tanggal_masuk,
      tanggal_keluar,
      total_harga,
      status,
      kasir_id,
      nama_paket,
    } = req.body;

    const transaksi = await Transaksi.findByPk(id);

    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi tidak ada " });
    }

    await transaksi.update({
      nama_pelanggan,
      berat,
      tanggal_masuk,
      tanggal_keluar,
      total_harga,
      status,
      kasir_id,
      nama_paket,
    });

    res.json({ message: "Transaksi berhasil diupdate", data: transaksi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const transaksi = await Transaksi.findByPk(id);

    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi tidak ditemukan" });
    }

    await transaksi.destroy();

    res.json({ message: "Transaksi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
