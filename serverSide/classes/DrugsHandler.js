var db = require('./DBHandler');

module.exports = class DrugHandler {

    constructor() {
        this.db = db;
    }

    createDrugIfNotExist(drug) {
        return this.getDrugByName(drug.getName()).then(
            (result) => {
                if (!this.db.isResultEmpty(result)) {
                    return 'drug already exist';
                } else {
                    this.createDrug(drug.getName(), drug.getDaysAfterOpened).then((result) => {
                        let msg = result ? 'Drug created' : 'db error occured2';
                        return (msg);
                    }, (err) => {
                        return (err);
                    })

                }
            },
            (err) => {
                return (err);
            });
    }

    createDrug(name, daysAfterOpened) {
        let sql = "INSERT INTO Drugs (DrugName, daysAfterOpened) VALUES ('" + name + "'," + daysAfterOpened + ")";
        return this.db.runSQL(sql);
    }

    getDrugByName(name) {
        let sql = "SELECT * FROM Drugs WHERE DrugName='" + name + "'";
        return this.db.runSQL(sql);
    }

    getDrugById(id) {
        let sql = "SELECT * FROM Drugs WHERE DrugId='" + id + "'";
        return this.db.runSQL(sql).then((result) => {
            if (this.db.isResultEmpty(result)) {
                 return 'drug not found';
            } else {
               return JSON.stringify(result[0]);
            }
        },
        (err) => {
            return (err);
        });
    }
};