const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Berat = sequelize.define("Berat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  berat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Berat;
