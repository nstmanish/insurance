/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ====CHAINCODE EXECUTION SAMPLES (CLI) ==================

// ==== Get History  ====
// peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllInsurance"]}'

// ==== Query assets ====

// peer chaincode query -C mychannel -n basic -c '{"Args":["QueryAssets", "{ \"selector\": {\"DockType\": { \"$eq\": \"User_model\" }}}" ]}'

// peer chaincode query -C mychannel -n basic -c '{"Args":["QueryAssets", "{ \"selector\": {\"DockType\": { \"$eq\": \"Insurance_model\" }}}" ]}'

"{ \"selector\": {\"DockType\": { \"$eq\": \"User_model\" }}}"
'use strict';

const { Contract } = require('fabric-contract-api');

class InsuranceContract extends Contract {

    async NewInsurance( ctx, insuranceId, insurancetype ) {

        try{

            const currentOwnerId = ctx.clientIdentity.getID();
            const currentMSPIS   = ctx.clientIdentity.getMSPID();

            if (currentMSPIS == 'Org1MSP'){
                
                const insurance = {
                    InsuranceId         : insuranceId,   
                    CurrentOwnerType    : "Customer",
                    CustomerId          : currentOwnerId,
                    Insurancetype       : insurancetype,
                    DockType            : "Insurance_model"
                };

                ctx.stub.putState(insuranceId, Buffer.from(JSON.stringify(insurance)));

                return JSON.stringify(insurance);
            }

            return {
                message : "unAuthorized"
            }
        
        }catch(error){
            console.log(`error ${error}`);
        }

        
    }

    async ReadInsurance(ctx, insuranceId) {
        const insuranceJSON = await ctx.stub.getState(insuranceId);
        if (!insuranceJSON || insuranceJSON.length === 0) {
            throw new Error(`The Insurance ${insuranceId} does not exist`);
        }
        return insuranceJSON.toString();
    }

    async VerifiedDamage(ctx, insuranceId, damageVerified, insuranceAmount){

        try{

            const currentOwnerId = ctx.clientIdentity.getID();
            const currentMSPIS   = ctx.clientIdentity.getMSPID();

            const insuranceString = await this.ReadInsurance(ctx, insuranceId);
            const insurance = JSON.parse(insuranceString);
            
            if (currentMSPIS == 'Org2MSP'){

                insurance.CurrentOwnerType    = "Insurance";
                insurance.InsuranceCompanyId  = currentOwnerId;  
                insurance.DamageVerified      = damageVerified;
                insurance.InsuranceAmount     = insuranceAmount;

                return ctx.stub.putState(insuranceId, Buffer.from(JSON.stringify(insurance)));
            
            }
    
            return {
                message : "unAuthorized"
            }

        }catch(error){
            console.log(`error ${error}`);
        }

        
    }

    async InsurancePayment(ctx, insuranceId, insuranceAmountPaid){

        try{

            const currentOwnerId = ctx.clientIdentity.getID();
            const currentMSPIS   = ctx.clientIdentity.getMSPID();
            
            const insuranceString = await this.ReadInsurance(ctx, insuranceId);
            const insurance = JSON.parse(insuranceString);
            
            if (currentMSPIS == 'Org3MSP' && insurance.DamageVerified == 'true'){

                insurance.CurrentOwnerType = "Bank";
                insurance.InsuranceAmountPaid = insuranceAmountPaid;
                insurance.BankId = currentOwnerId;

                return ctx.stub.putState(insuranceId, Buffer.from(JSON.stringify(insurance)));
                
            }

            if (insurance.DamageVerified != 'true')
            {
                return {
                    message : "unAuthorized"
                }
            }

            return {
                message : "unAuthorized"
            }
            

        }catch(error){
            console.log(`error ${error}`);
        }
    }
    
    async GetAllInsurance(ctx) {

        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);

    }

    async GetInsuranceHistory(ctx, insuranceId) {
        const allResults = [];
        const iterator = await ctx.stub.getHistoryForKey(insuranceId);
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async AddUser( ctx, userId, usertype, name, email, phone ) {
        const user = {
            UserId      : userId,
            UserType    : usertype,
            Name        : name,
            Email       : email,
            Phone       : phone,
            DockType    : "User_model"
        };
        ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        return JSON.stringify(user);
    }

    async UpdateUser(ctx, userId, usertype, name, email, phone ) {
        const user = {
            UserId   : userId,
            UserType : usertype,
            Name     : name,
            Email    : email,
            Phone    : phone
        };
        ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        return JSON.stringify(user);
    }


    async QueryAssets(ctx, queryString) {
		return await this.GetQueryResultForQueryString(ctx, queryString);
	}

    async GetQueryResultForQueryString(ctx, queryString) {
        console.log(queryString);
		let resultsIterator = await ctx.stub.getQueryResult(queryString);
		let results = await this.GetAllResults(resultsIterator, false);

		return JSON.stringify(results);
	}


    async GetAllResults(iterator, isHistory) {
		let allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				console.log(res.value.value.toString('utf8'));
				if (isHistory && isHistory === true) {
					jsonRes.TxId = res.value.tx_id;
					jsonRes.Timestamp = res.value.timestamp;
					try {
						jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Value = res.value.value.toString('utf8');
					}
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
				}
				allResults.push(jsonRes);
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}
    
}

module.exports = InsuranceContract;
