const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, "jwtsecret");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed",
        })
    }
};