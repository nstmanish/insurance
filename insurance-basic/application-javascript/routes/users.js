const express = require('express');
const router = express.Router();

const User = require("../controllers/user");

router.post('/registerUser', User.register);

module.exports = router;
