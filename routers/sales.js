const express = require("express");
const router = express.Router();
const { getRevenueTrend, getCategoryPerformance } = require("../controllers/salesController"); // Önceki cevaptaki controller
router.get("/trend", getRevenueTrend);
router.get("/categories", getCategoryPerformance);
module.exports = router;