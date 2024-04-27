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
    berat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggal_masuk: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_keluar: {
      type: DataTypes.DATE,
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
    tableName: "transaksi",
  }
);

Transaksi.belongsTo(User, {
  foreignKey: "nama_kasir",
  as: "kasir",
  targetKey: "nama",
});

Transaksi.belongsTo(Paket, {
  foreignKey: "nama_paket",
  as: "paket",
  targetKey: "kd_paket",
});

module.exports = Transaksi;
