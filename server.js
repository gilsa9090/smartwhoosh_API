const express = require("express");
const sequelize = require("./config/database");
const path = require("path");
const authRoute = require("./routes/authRoute");
const paketRoute = require("./routes/paketRoute");
const transaksiRoute = require("./routes/transaksiRoute");
const beratRoute = require("./routes/beratRoute");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "uploads")));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database Synced");
  })
  .catch((err) => {
    console.error("Error Syncing database : ", err);
  });

app.use("/api", authRoute);
app.use("/api", paketRoute);
app.use("/api", transaksiRoute);
app.use("/api", beratRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
