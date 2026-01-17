const express = require("express");
const router = express.Router();
const { getProcurementScenarios } = require("../controllers/procurementController"); // Önceki cevaptaki controller
router.get("/scenarios", getProcurementScenarios);
module.exports = router;