const { buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildWallet } = require('../utils/AppUtil');

exports.getCCP = (org) => {

    let ccp;

    switch (org) {

        case "Org1MSP":
            ccp = buildCCPOrg1();
            break;
        case "Org2MSP":
            ccp = buildCCPOrg2();
            break;
        case "Org3MSP":
            ccp = buildCCPOrg3();
            break;
    }
     return ccp;
}

exports.getCA = (org) => {

    let ca;

    switch (org) {

        case "Org1MSP":
            ca = `ca.org1.example.com`;
            break;
        case "Org2MSP":
            ca = `ca.org2.example.com`;
            break;
        case "Org3MSP":
            ca = `ca.org3.example.com`;
            break;
    }
     return ca;
}

exports.getaf = (org) => {

    let af;

    switch (org) {

        case "Org1MSP":
            af = `org1.department1`;
            break;
        case "Org2MSP":
            af = `org2.department1`;
            break;
        case "Org3MSP":
            af = `org3.department1`;
            break;
    }
     return af;
}