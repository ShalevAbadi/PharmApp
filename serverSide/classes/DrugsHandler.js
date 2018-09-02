var db = require('./DBHandler');

module.exports = class DrugHandler {

    constructor() {
        this.db = db;
    }

    createDrugIfNotExist(drug) {
        return new Promise((resolve, reject) => {
            this.getDrugByName(drug.name).then(
                (result) => {
                    if (!this.db.isResultEmpty(result)) {
                        resolve();
                    } else {
                        this.createDrug(drug.name, drug.daysAfterOpened).then((result) => {
                            resolve(result);
                        }, (err) => {
                            reject(err);
                        })

                    }
                },
                (err) => {
                    reject(err);
                });
        })
    }

    createDrug(name, daysAfterOpened) {
        let sql = "INSERT INTO Drugs (name, daysAfterOpened) VALUES ('" + name + "'," + daysAfterOpened + ")";
        return this.db.runSQL(sql);
    }

    getDrugs() {
        let sql = "SELECT * FROM Drugs";
        return new Promise((resolve, reject) => {
            this.db.runSQL(sql).then((result) => {
                console.log(result[0]);
                resolve(result);
            },
                (err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getDrugByName(name) {
        let sql = "SELECT * FROM Drugs WHERE name='" + name + "'";
        return new Promise((resolve, reject) => {
            this.db.runSQL(sql).then((result) => {
                console.log(result[0]);
                resolve(result);
            },
                (err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getDrugById(id) {
        let sql = "SELECT * FROM Drugs WHERE DrugId='" + id + "'";
        return new Promise((resolve, reject) => {
            this.db.runSQL(sql).then((result) => {
                if (this.db.isResultEmpty(result)) {
                    resolve({ res: "drug not found" });
                } else {
                    console.log(result[0]);
                    resolve(result[0]);
                }
            },
                (err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
};