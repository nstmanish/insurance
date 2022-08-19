const { Gateway, Wallets }       = require('fabric-network');
const FabricCAServices  = require('fabric-ca-client');
const fs                = require('fs');
const path              = require('path');

const { buildCCPOrg1, buildCCPOrg2, buildWallet } = require('../utils/AppUtil');
const { getCCP } = require("../helper/buildCCP");

let walletPath;

exports.readAsset = async (data) => {
    
    try {

        walletPath = path.join(process.cwd(), 'wallet', data.org);

        let ccp         = buildCCPOrg1();
    
        const wallet    = await buildWallet(Wallets, walletPath);

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: data.userId, discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork(data.channelName);
        const contract = network.getContract(data.chainCodeName);
        
        const result = await contract.evaluateTransaction('GetAllAssets');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        await gateway.disconnect();

        return JSON.stringify(result.toString());
        
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * Get The history
 */
exports.getHistory = async (data) => {
    
    try {

        let walletPath  = path.join(process.cwd(), 'wallet', data.org);

        let ccp         = getCCP(data.org);
    
        const wallet    = await buildWallet(Wallets, walletPath);

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: data.userId, discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork(data.channelName);
        const contract = network.getContract(data.chainCodeName);
       
        const result = await contract.evaluateTransaction('GetInsuranceHistory', data.insurance.insuranceId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        await gateway.disconnect();

        return JSON.parse(result.toString())
        // return JSON.stringify(result);
        
    } catch (error) {

        throw new Error(error)
        
    }
}

exports.getFromQuery = async (data) => {

    try {

        let walletPath  = path.join(process.cwd(), 'wallet', data.org);

        let ccp         = getCCP(data.org);
    
        const wallet    = await buildWallet(Wallets, walletPath);

        const gateway   = new Gateway();
        await gateway.connect(ccp, { wallet, identity: data.userId, discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork(data.channelName);
        const contract = network.getContract(data.chainCodeName);
        
        const result = await contract.evaluateTransaction('QueryAssets', `{\"selector\":{\"DockType\":{\"$eq\":\"${data.dockType}\"}}}`);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        await gateway.disconnect();

        return JSON.parse(result.toString())
        // return JSON.stringify(result);
        
    } catch (error) {
        throw new Error(error);
    }
    
}