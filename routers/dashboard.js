const express = require("express");
const router = express.Router();
const { getKPIs, getBrandShare, getInsights } = require("../controllers/dashboardController");
router.get("/kpi", getKPIs);
router.get("/brands", getBrandShare);
router.get("/insights", getInsights);
module.exports = router;