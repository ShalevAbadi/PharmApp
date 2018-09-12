const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');

const userHandlerReq = require('../../../classes/UserHandler');
const userHandler = new userHandlerReq();
const User = require('../../../classes/User');

router.post('/signup', (req, res, next) => {
    let user = new User(
        null,
        req.body.userName,
        req.body.password,
        req.body.email
    )
    if (validateEmail(user.email === false)) {
        res.status(404).json({
            message: "Invalid email address"
        })
    }
    userHandler.createUserIfNotExist(user).then(
        (result) => {
            if (!result) {
                res.status(404).json({
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
    if (validateEmail(user.email === false)) {
        res.status(404).json({
            message: "Invalid email address"
        })
    }
    userHandler.checkIfEmailExist(req.params.email).then(
        (result) => {
            if (result) {
                res.status(404).json({
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