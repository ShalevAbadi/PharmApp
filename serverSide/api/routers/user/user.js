const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const checkAuth = require('../../middleware/check-auth');
const userHandlerReq = require('../../../classes/UserHandler');
const userHandler = new userHandlerReq();
const User = require('../../../classes/User');
const signUp = require('./signUp');
const login = require('./login');

router.post('/validateLogin', checkAuth, (req, res, next) => {
    res.status(200).json({
        auth: true
    });

});

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

router.post('/signup', (req, res, next) => {
    let user = new User(
        null,
        req.body.userName,
        req.body.password,
        req.body.email

    )
    if (validateEmail(user.email === false)) {
        res.status(422).json({
            message: "Invalid email address"
        })
    }
    userHandler.createUserIfNotExist(user).then(
        (result) => {
            if (!result) {
                res.status(409).json({
                    message: 'User already exist'
                });
            }
            else {
                res.status(201).json({
                    message: 'User created'
                });
            }
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

router.get('/signup/:email', (req, res, next) => {
    if (validateEmail(req.params.email) === false) {
        res.status(422).json({
            message: "Invalid email address"
        })
    }
    userHandler.checkIfEmailExist(req.params.email).then(
        (result) => {
            if (result[0]) {
                res.status(409).json({
                    message: 'Email alreay exist'
                });
            }
            else {
                res.status(200).json({
                    message: 'Email is good for use'
                });
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