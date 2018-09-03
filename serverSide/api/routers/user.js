const express = require('express');
const router = express.Router();

const userHandlerReq = require('../../classes/UserHandler');
const userHandler = new userHandlerReq();
const User = require('../../classes/User');

router.post('/signup', (req, res, next) => {
    let user = new User(
        null,
        req.body.userName,
        req.body.password,
        req.body.email
    )
    userHandler.createUserIfNotExist(user).then(
        (result) => {
            if (!result) {
                res.status(404).json({
                    message: 'User already exist'
                });
            }
            else {
                res.status(200).json(result);
            }
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

router.get('/signup/:email', (req, res, next) => {
    userHandler.checkIfEmailExist(req.params.email).then(
        (result) => {
            if (!result) {
                res.status(404).json({
                    message: 'Email not found'
                });
            }
            else {
                res.status(200).json(result);
            }
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;