const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("smartwhoosh", "root", "@Gilangsadewa123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
