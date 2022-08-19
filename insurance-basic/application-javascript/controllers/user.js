const { registerUser, userExist, addUser } = require('../helper/registerUser');


exports.register = async function(req, res, next) {
    try {

        let org             = req.body.org;
        let userId          = req.body.userId;
        let usertype        = req.body.usertype;
        let name            = req.body.name;
        let email           = req.body.email;
        let phone           = req.body.phone;
        let channelName     = req.body.channelName;
        let chainCodeName   = req.body.chainCodeName;

        let result   = await registerUser({ OrgMSP: org, userId: userId });

        let adduser  = await addUser(channelName, chainCodeName, userId, usertype, name, email, phone, org);

        res.send({result, message:"user created and Added to Network" });

    }catch(e){
        res.status(500).send('internal Error');
    }
    
}