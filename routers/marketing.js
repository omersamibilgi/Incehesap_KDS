const express = require("express");
const router = express.Router();
const { getCampaignSuggestions } = require("../controllers/marketingController");
router.get("/suggestions", getCampaignSuggestions);
module.exports = router;