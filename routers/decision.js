const express = require("express");
const router = express.Router();
const { getDecisionAnalysis } = require("../controllers/decisionController");

// Endpoint: /api/decision/analyze
router.get("/analyze", getDecisionAnalysis);

module.exports = router;