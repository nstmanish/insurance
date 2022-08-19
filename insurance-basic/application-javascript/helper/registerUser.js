const { Gateway, Wallets }       = require('fabric-network');
const FabricCAServices  = require('fabric-ca-client');
const fs                = require('fs');
const path              = require('path');

const { 
    buildCAClient, 
    enrollAdmin, 
    registerAndEnrollUser 
}                      = require('../utils/CAUtil');

const { buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildWallet } = require('../utils/AppUtil');
const { getCCP , getCA, getaf } = require("../helper/buildCCP");


let walletPath;
let ccp;
let ca;
let af;

exports.registerUser = async ({ OrgMSP, userId }) => {
    
    try {
        
        walletPath = path.join(process.cwd(), 'wallet', OrgMSP);
       
        ccp = getCCP(OrgMSP);
               
        const caClient  = buildCAClient(FabricCAServices, ccp, getCA(OrgMSP) );
       
        const wallet    = await buildWallet(Wallets, walletPath);
        
        await enrollAdmin(caClient, wallet, OrgMSP);
       
        await registerAndEnrollUser(caClient, wallet, OrgMSP, userId, getaf(OrgMSP) );
        
        return {
            wallet
        }

    } catch (error) {
        throw new Error(error);
    }
}


exports.userExist = async () => {
    
}

exports.addUser   = async (channelName, chainCodeName, userId, usertype, name, email, phone, org) => {
    
    try {

        walletPath = path.join(process.cwd(), 'wallet', org);

        let ccp         = getCCP(org);
  
        const wallet    = await buildWallet(Wallets, walletPath);

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userId, discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chainCodeName);
        
        const result = await contract.submitTransaction( 'AddUser', userId, usertype, name, email, phone );
    
        await gateway.disconnect();

        return result;
        
    } catch (error) {
        throw new Error(error);
    }
}