const userDrugsHandlerReq = require('../../classes/UserDrugsHandler');
const userDrugsHandler = new userDrugsHandlerReq();
module.exports = (req, res, next) => {
    userDrugsHandler.validateItIsTheSameUser(req.params.userDrugId, req.userData.userId).then((result) => {
        if (result) {
            return next();
        }
        return res.status(401).json({
            message: "Auth failed",
        })
    });


}; 