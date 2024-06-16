const Transaksi = require("../models/transaksiModel");
const Paket = require("../models/paketModels");
const User = require("../models/userModels");
const { Op } = require("sequelize");

exports.createTransaksi2 = async (req, res) => {
  try {
    const lastTransaksi = await Transaksi.findOne({
      order: [["createdAt", "DESC"]],
    });

    let kd_transaksi;
    if (lastTransaksi) {
      const lastKode = lastTransaksi.kd_transaksi;
      const lastNumber = parseInt(lastKode.slice(3)); // Ambil angka setelah "LOU"
      const nextNumber = lastNumber + 1;
      kd_transaksi = `LOU${nextNumber.toString().padStart(3, "0")}`;
    } else {
      // Jika tidak ada data transaksi, mulai dengan LOU001
      kd_transaksi = "LOU001";
    }

    // Buat transaksi baru dengan kode yang telah di-generate
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

    const newTransaksi = await Transaksi.create({
      nama_pelanggan,
      berat,
      tanggal_masuk,
      tanggal_keluar,
      total_harga,
      status,
      kasir_id,
      nama_paket,
      kd_transaksi: kd_transaksi, // Assign the generated transaction code
    });

    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      data: {
        kd_transaksi: newTransaksi.kd_transaksi,
        nama_pelanggan: newTransaksi.nama_pelanggan,
        berat: newTransaksi.berat,
        tanggal_masuk: newTransaksi.tanggal_masuk,
        tanggal_keluar: newTransaksi.tanggal_keluar,
        total_harga: newTransaksi.total_harga,
        status: newTransaksi.status,
        kasir_id: newTransaksi.kasir_id,
        nama_paket: newTransaksi.nama_paket,
      },
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalHargaSemuaTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();

    let totalHargaSemuaTransaksi = 0;
    transaksi.forEach((item) => {
      totalHargaSemuaTransaksi += item.total_harga;
    });

    res.json({ total_harga_semua_transaksi: totalHargaSemuaTransaksi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCountTransaksi = async (req, res) => {
  try {
    const countTransaksi = await Transaksi.count();
    res.json({ countTransaksi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransaksi = async (req, res) => {
  try {
    const lastTransaksi = await Transaksi.findOne({
      order: [["createdAt", "DESC"]],
    });

    let kd_transaksi;
    if (lastTransaksi) {
      const lastKode = lastTransaksi.kd_transaksi;
      const lastNumber = parseInt(lastKode.slice(3)); // Ambil angka setelah "LOU"
      const nextNumber = lastNumber + 1;
      kd_transaksi = `LOU${nextNumber.toString().padStart(3, "0")}`;
    } else {
      // Jika tidak ada data transaksi, mulai dengan LOU001
      kd_transaksi = "LOU001";
    }

    // Create new transaction with generated code
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

    const newTransaksi = await Transaksi.create({
      nama_pelanggan,
      berat,
      tanggal_masuk,
      tanggal_keluar,
      total_harga,
      status,
      kasir_id,
      nama_paket,
      kd_transaksi: kd_transaksi, // Assign the generated transaction code
    });

    res
      .status(201)
      .json({ message: "Transaksi berhasil dibuat", data: newTransaksi });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
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

exports.updateTransaksiStatus = async (req, res) => {
  const { id } = req.params; // Ambil id transaksi dari URL params
  const { status } = req.body; // Ambil status baru dari body request

  try {
    // Cari transaksi berdasarkan id
    const transaksi = await Transaksi.findByPk(id);

    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi not found" });
    }

    // Lakukan update pada status transaksi
    transaksi.status = status;
    await transaksi.save();

    res.json({
      message: "Transaksi status updated successfully",
      data: transaksi,
    });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ error: "Internal server error" });
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
