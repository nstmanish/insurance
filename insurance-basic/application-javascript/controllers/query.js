const { Gateway, Wallets } = require('fabric-network');
const path                 = require('path');
const fs                   = require('fs');

const { readAsset, getHistory, getFromQuery } = require('../helper/query');

exports.readAsset = async function(req, res, next) {
    try {

        let data = {
            "org": req.body.org,
            "channelName": req.body.channelName,
            "chainCodeName": req.body.chainCodeName,
            "userId": req.body.userId,
        };

        let result = await readAsset(data);

        res.status(200).json(result);

    }catch(e){
        res.status(500).send({ message: e.message });
    }
    
}

exports.getHistory = async function(req, res, next) {
    try {

        let data = {
            "org"           : req.body.org,
            "channelName"   : req.body.channelName,
            "chainCodeName" : req.body.chainCodeName,
            "userId"        : req.body.userId,
            "insurance": {
                "insuranceId"        : req.body.insurance.insuranceId
            }
        };

        let result = await getHistory(data);

        res.send(result);

    }catch(e){
 
        res.status(500).send({ message: e.message });
    }
    
}

exports.getFromQuery = async function(req, res, next) {
    try {

        let data = {
            "org"           : req.body.org,
            "channelName"   : req.body.channelName,
            "chainCodeName" : req.body.chainCodeName,
            "userId"        : req.body.userId,
            "dockType"      : req.body.dockType
        };

        let result = await getFromQuery(data);

        res.send(result);

    }catch(e){
        res.status(500).send({ message: e.message });
    }
    
}
