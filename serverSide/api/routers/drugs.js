const express = require('express');
const router = express.Router();

const drugsHandlerReq = require('../../classes/DrugsHandler');
const drugsHandler = new drugsHandlerReq();
const Drug = require('../../classes/Drug');

router.post('/', (req, res, next) => {
    let drug = new Drug(
        null,
        req.body.name,
        req.body.daysAfterOpened
    );
    drugsHandler.createDrugIfNotExist(drug).then(
        (result) => {
            if (!result) {
                res.status(404).json({
                    message: 'Drug already exist'
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

router.get('/:drugId', (req, res, next) => {
    let id = req.params.drugId;
    drugsHandler.getDrugById(id).then((result) => {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: "drug not found" });
        }
    }, (err) => {
        res.status(500).json({ error: err });
    });
});

router.get('/', (req, res, next) => {
    drugsHandler.getDrugs().then((result) => {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: "drugs not found" });
        }
    }, (err) => {
        res.status(500).json({ error: err });
    });
});




module.exports = router;