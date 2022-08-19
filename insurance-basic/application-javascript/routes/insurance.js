const express = require('express');
const router = express.Router();

const Insurance = require("../controllers/insurance");

router.post('/verifyDamage', Insurance.verifyDamage);

module.exports = router;
