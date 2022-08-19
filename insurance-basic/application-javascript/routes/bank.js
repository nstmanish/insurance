const express = require('express');
const router = express.Router();

const Bank = require("../controllers/bank");

router.post('/payClaimInsurance', Bank.makePayment);

module.exports = router;
