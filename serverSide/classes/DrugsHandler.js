module.exports = class DrugHandler {

    constructor(db) {
        this.db = db;
    }

    createDrugIfNotExist(drug) {
        return this.getDrugByName(drug.getName()).then(
            (result) => {
                if (!this.db.isResultEmpty(result)) {
                    console.log('drug already exist');
                } else {
                    this.createDrug(drug.getName(), drug.getDaysAfterOpened).then((result) => {
                        let msg = result ? 'Drug created' : 'db error occured2';
                        console.log(msg);
                    }, (err) => {
                        console.log(err);
                    })

                }
            },
            (err) => {
                console.log(err);
            });
    }

    createDrug(name, daysAfterOpened) {
        let sql = "INSERT INTO Drugs (DrugName, daysAfterOpened) VALUES ('" + name + "'," + daysAfterOpened + ")";
        return this.db.runSQL(sql).then(console.log.bind(console));;
    }

    getDrugByName(name) {
        let sql = "SELECT * FROM Drugs WHERE DrugName='" + name + "'";
        return this.db.runSQL(sql).then(console.log.bind(console));;
    }
};