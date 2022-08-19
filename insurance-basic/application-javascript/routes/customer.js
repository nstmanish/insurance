const express = require('express');
const router = express.Router();

const Customer = require("../controllers/customer");

router.post('/creatInsurance', Customer.creatInsurance);
router.post('/claimInsurance', Customer.claimInsurance);

module.exports = router;
