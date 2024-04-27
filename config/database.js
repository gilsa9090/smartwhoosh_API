const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("smartwhoosh", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
