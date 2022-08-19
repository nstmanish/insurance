const { claimInsurance, creatInsurance }  = require("../helper/customerHelper");

/** 
 * Create Insurance Model
 */
exports.creatInsurance = async function(req, res, next) {
    try {

        let data = {
            "org"           : req.body.org,
            "channelName"   : req.body.channelName,
            "chainCodeName" : req.body.chainCodeName,
            "userId"        : req.body.userId,
            "insurance": {
                "insuranceId"        : req.body.insurance.insuranceId,   
                "currentOwnerType"   : req.body.insurance.currentOwnerType,
                "customerId"         : req.body.insurance.customerId,
                "InsuranceCompanyId" : req.body.insurance.InsuranceCompanyId,
                "insurancetype"      : req.body.insurance.insurancetype ,
                "damageDetails"      : req.body.insurance.damageDetails,
                "damageVerified"     : req.body.insurance.damageVerified,
                "insuranceAmount"    : req.body.insurance.insuranceAmount,
                "insuranceAmountPaid": req.body.insurance.insuranceAmountPaid,
                "bankId"             : req.body.insurance.bankId
            }
        };
        console.log(data);
        let result = await creatInsurance(data);

        res.send(result);

    }catch(e){
        res.status(500).send({ message: e.message });
    }
    
}

/**
 * Claim Insurance Model
 */
exports.claimInsurance = async function(req, res, next) {
    try {

        let data = {
            "org"               : req.body.org,
            "channelName"       : req.body.channelName,
            "chainCodeName"     : req.body.chainCodeName,
            "userId"            : req.body.userId,
            "insurance": {
                "insuranceId"        : req.body.insurance.insuranceId, 
                "currentOwnerType"   : req.body.insurance.currentOwnerType
            }
        };

        let result = await claimInsurance(data);

        res.send(result);

    }catch(e){
        res.status(500).send({ message: e.message });
    }
    
}