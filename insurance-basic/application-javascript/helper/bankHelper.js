const { Gateway, Wallets }       = require('fabric-network');
const FabricCAServices           = require('fabric-ca-client');
const fs                         = require('fs');
const path                       = require('path');

const { buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildWallet } = require('../utils/AppUtil');
const { getCCP } = require("../helper/buildCCP");

let walletPath;

exports.makePayment = async (data) => {
    
    try {
        
        let ccp         = getCCP(data.org);

        let walletPath  = path.join(process.cwd(), 'wallet', data.org);
    
        const wallet    = await buildWallet(Wallets, walletPath);

        const gateway   = new Gateway();

        await gateway.connect(ccp, 
            { wallet, identity: data.userId, discovery: { enabled: true, asLocalhost: true } }
        );

        const network   = await gateway.getNetwork(data.channelName);

        const contract  = network.getContract(data.chainCodeName);
            
        const result = await contract.submitTransaction(
            'InsurancePayment', 
            data.insurance.insuranceId, 
            data.insurance.insuranceAmountPaid
        );
        
        return {
            message: "Payment Completed and updated to ledger"
        };
        
    } catch (error) {
        throw new Error(error)
    }
}