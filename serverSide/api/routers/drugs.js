const express = require('express');
const router = express.Router();
const db = require('../../classes/DBHandler');
const dataBase = new db();
const dh = require('../../classes/DrugsHandler');
const drugsHandler = new dh(dataBase);

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /drugs'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /drugs'
    });
});

router.patch('/:drugId', (req, res, next) => {
    res.status(200).json({
        message: 'You have updated a drug'
    });
});

router.delete('/:drugId', (req, res, next) => {
    res.status(200).json({
        message: 'You have deleted a drug'
    });
});

router.post('/:drugId', (req, res, next) => {
    const id = req.params.drugId;
    if (id === 'special') {
        res.status(200).json({
            massage: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            massage: 'You passed an id',
            id: id
        });
    }

});



module.exports = router;