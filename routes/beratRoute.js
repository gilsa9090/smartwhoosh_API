const express = require("express");
const router = express.Router();
const beratController = require("../controller/beratController");

// Route untuk menginput data berat
router.post("/berat", beratController.inputBerat);
router.get("/berat", beratController.getBerat);
router.put("/berat/:beratId", beratController.updateBerat);

module.exports = router;
