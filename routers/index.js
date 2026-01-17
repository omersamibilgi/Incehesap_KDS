const express = require("express");
const router = express.Router();

router.use("/inventory", require("./inventory"));
router.use("/sales", require("./sales"));
router.use("/procurement", require("./procurement"));
router.use("/marketing", require("./marketing"));
router.use("/dashboard", require("./dashboard"));

module.exports = router;