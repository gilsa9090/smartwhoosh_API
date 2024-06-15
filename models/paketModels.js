const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Paket = sequelize.define(
  "Paket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_paket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga_paket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    kd_paket: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "paket",
    indexes: [
      {
        unique: true,
        fields: ["kd_paket"], // Menambahkan indeks pada kolom kd_paket
      },
    ],
  }
);

module.exports = Paket;
