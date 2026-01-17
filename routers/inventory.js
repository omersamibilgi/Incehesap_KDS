const express = require("express");
const router = express.Router();
const { getInventoryAnalysis } = require("../controllers/inventoryController");
router.get("/analyze", getInventoryAnalysis);
module.exports = router;