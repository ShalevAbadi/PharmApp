const express = require('express');
const router = express.Router();
const userDrugsHandlerReq = require('../../classes/UserDrugsHandler');
const userDrugsHandler = new userDrugsHandlerReq();
const UserDrug = require('../../classes/UserDrug');
const Drug = require('../../classes/Drug');
const User = require('../../classes/User');
const checkAuth = require('../middleware/check-auth');
const userDrugAuth = require('../middleware/userDrugAuth');

router.get('/', checkAuth, (req, res, next) => {
    let userId = req.userData.userId
    userDrugsHandler.getUserDrugs(userId).then((result) => {
        res.status(200).json(result);
    },
        (err) => {
            res.status(500).json({ error: err });
        })
});

router.post('/', checkAuth, (req, res, next) => {
    let user = new User(
        req.userData.userId
    );
    let drug = new Drug(
        req.body.drugId,
    );
    let userDrug = new UserDrug(
        null,
        user,
        drug,
        req.body.closedExpirationDate,
        req.body.dateOpened,
        req.body.isOpened,
        req.body.isDeleted
    );
    userDrugsHandler.createUserDrug(userDrug).then(
        (result) => {
            res.status(201).json({
                message: 'Drug added'
            });
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

router.patch('/:userDrugId', checkAuth, userDrugAuth, (req, res, next) => {
    let userDrugId = req.params.userDrugId;
    let drugId = req.body.drugId;
    let closedExpirationDate = new Date(req.body.closedExpirationDate).toLocaleDateString();
    let dateOpened = new Date(req.body.dateOpened).toLocaleDateString();
    let isOpened = req.body.isOpened;
    let isDeleted = req.body.isDeleted;
    userDrugsHandler.updateUserDrug(userDrugId, drugId, closedExpirationDate, dateOpened, isOpened, isDeleted).then(
        (result) => {
            res.status(200).json({
                message: 'User drug udated'
            });
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:userDrugId', checkAuth, userDrugAuth, (req, res, next) => {
    let userDrugId = req.params.userDrugId;
    userDrugsHandler.deleteUserDrug(userDrugId).then(
        (result) => {
            res.status(200).json({
                message: 'User drug deleted'
            });
        },
        (err) => {
            res.status(500).json({ error: err });
        });
});


module.exports = router;