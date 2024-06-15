const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModels");
const Paket = require("./paketModels");

const Transaksi = sequelize.define(
  "Transaksi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_pelanggan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kd_transaksi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure kd_transaksi is unique
    },
    berat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggal_masuk: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tanggal_keluar: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "transaksi", // Specify the table name explicitly
    indexes: [
      // Consider adding indexes for frequently used columns
      {
        unique: false, // Set to true if you want a unique index
        fields: ["kasir_id"], // Example: Index on kasir_id
      },
      {
        unique: false,
        fields: ["nama_paket"], // Example: Index on nama_paket
      },
    ],
  }
);

// Define associations
Transaksi.belongsTo(User, {
  foreignKey: "kasir_id", // Foreign key in Transaksi model
  as: "kasir", // Alias for the association
  targetKey: "id",
});

Transaksi.belongsTo(Paket, {
  foreignKey: "nama_paket",
  as: "paket",
  targetKey: "kd_paket",
});

module.exports = Transaksi;
