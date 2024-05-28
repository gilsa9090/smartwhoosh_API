const Berat = require("../models/beratModels"); // Sesuaikan dengan path dan nama model yang Anda gunakan

exports.inputBerat = async (req, res) => {
  try {
    const { berat } = req.body;

    // Pastikan berat yang diinputkan ada dan valid
    if (!berat || typeof berat !== "number") {
      return res.status(400).json({ message: "Invalid input for berat" });
    }

    // Buat data baru dalam tabel Berat
    await Berat.create({ berat });

    res.status(201).json({ message: "Berat successfully added" });
  } catch (error) {
    console.error("Error inputting berat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBerat = async (req, res) => {
  try {
    const beratData = await Berat.findOne();

    if (!beratData) {
      return res.status(404).json({ message: "Berat data not found" });
    }

    res.json(beratData);
  } catch (error) {
    console.error("Error retrieving berat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateBerat = async (req, res) => {
  try {
    const { beratId } = req.params;
    const berat = parseInt(beratId);

    if (isNaN(berat)) {
      return res.status(400).json({ message: "Invalid input for beratId" });
    }

    const updatedBerat = await Berat.findOne();

    if (!updatedBerat) {
      return res.status(404).json({ message: "Berat data not found" });
    }

    updatedBerat.berat = berat;
    await updatedBerat.save();

    res.json({ message: "Berat successfully updated", berat: updatedBerat });
  } catch (error) {
    console.error("Error updating berat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
