const { makePayment } = require("../helper/bankHelper");

/**
 * Make Payment once verified
 */
exports.makePayment = async function(req, res, next) {
    try {

        let data = {
            "org"               : req.body.org,
            "channelName"       : req.body.channelName,
            "chainCodeName"     : req.body.chainCodeName,
            "userId"            : req.body.userId,
            "insurance": {
                "insuranceId"           : req.body.insurance.insuranceId,   
                "insuranceAmountPaid"   : req.body.insurance.insuranceAmountPaid
            }
        };

        let result = await makePayment(data);

        res.send(result);

    }catch(e){
        res.status(500).send({ message: e.message });
    }
    
}