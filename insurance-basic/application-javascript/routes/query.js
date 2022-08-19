const express = require('express');
const router = express.Router();

const Query = require("../controllers/query");

router.post('/getHistory'   , Query.getHistory);
router.post('/readAsset'    , Query.readAsset);
router.post('/getFromQuery' , Query.getFromQuery);

module.exports = router;
