const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userHandlerReq = require('../../../classes/UserHandler');
const userHandler = new userHandlerReq();
const User = require('../../../classes/User');


router.post('/login', (req, res, next) => {
    let user = new User(
        null,
        null,
        req.body.password,
        req.body.email
    );
    if (validateEmail(user.email) === false) {
        res.status(401).json({
            message: "Auth faild"
        })
    }
    userHandler.connectUser(user).then(
        (result) => {
            if (result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: result.userId,
                    userName: result.userName
                },
                    "jwtsecret",
                    {
                        expiresIn: "1h"
                    },

                )
                res.status(200).json({
                    message: "Auth seccessful",
                    token: token
                });
            }
            else {
                res.status(401).json({
                    message: "Auth faild"
                })
            }
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

validateEmail = (email) => {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) {
        return (true)
    }
    return (false)
}


module.exports = router;