const express = require('express');
const router = express.Router();

const drugsHandlerReq = require('../../classes/DrugsHandler');
const drugsHandler = new drugsHandlerReq();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /drugs'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /drugs',
        createdDrug: drug
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
    let id = req.params.drugId;
    if (id === 'special') {
        res.status(200).json({
            massage: 'You discovered the special ID',
            id: id
        });
    } else {
        drugsHandler.getDrugById(id).then((result) => {

            /*if (drugsHandler.db.isResultEmpty(result)) {
                    return this.res.status(200).json("res: drug not found");
                } else {*/
            return this.res.status(200).json(result[0]);
            //}
        },
            (err) => {
                return (err);
            });
    }

});

module.exports = router;