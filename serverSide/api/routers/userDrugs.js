const express = require('express');
const router = express.Router();

const userDrugsHandlerReq = require('../../classes/UserDrugsHandler');
const userDrugsHandler = new userDrugsHandlerReq();
const UserDrug = require('../../classes/UserDrug');
const Drug = require('../../classes/Drug');
const User = require('../../classes/User');

router.get('/:userId', (req, res, next) => {
    let userId = req.params.userId;
    userDrugsHandler.getUserDrugs(userId).then((result) => {
        res.status(200).json(result);
    },
        (err) => {
            res.status(500).json({ error: err });
        })
});

router.post('/', (req, res, next) => {
    let user = new User(
        req.body.userId,
        'user name check'
    );
    let drug = new Drug(
        req.body.drugId,
        'drug name check',
        165
    );
    let userDrug = new UserDrug(
        null,
        user,
        drug,
        req.body.exp,
        req.body.dateOpened
    );
    userDrugsHandler.createUserDrug(userDrug).then(
        (result) => {
            res.status(200).json(result);
        },
        (err) => {
            res.status(500).json({ error: err });
        });

});

router.patch('/:userDrugId', (req, res, next) => {
    let userDrugId = req.params.userDrugId;
    userDrugsHandler.setUserDrugOpenedToday(userDrugId).then(
        (result) => {
            res.status(200).json(result);
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:userDrugId', (req, res, next) => {
    let userDrugId = req.params.userDrugId;
    userDrugsHandler.deleteUserDrug(userDrugId).then(
        (result) => {
            res.status(200).json(result);
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;