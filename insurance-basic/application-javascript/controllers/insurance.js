const { verifyDamage } = require("../helper/insuranceHelper");

/**
 * Verify Damage
 */
exports.verifyDamage = async function(req, res, next) {
    try {

        let data = {
            "org"           : req.body.org,
            "channelName"   : req.body.channelName,
            "chainCodeName" : req.body.chainCodeName,
            "userId"        : req.body.userId,
            "insurance": {
                "insuranceId"        : req.body.insurance.insuranceId,   
                "damageVerified"     : req.body.insurance.damageVerified,
                "insuranceAmount"    : req.body.insurance.insuranceAmount
            }
        };

        let result = await verifyDamage(data);

        res.send(result);

    }catch(e){
        res.status(500).send({ message: e.message });
    }
    
}