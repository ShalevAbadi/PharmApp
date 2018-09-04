var db = require('./DBHandler');

module.exports = class UserDrugsHandler {

    constructor() {
        this.db = db;
    }

    createUserDrug(userDrug) {
        return this.createUserDrugDB(userDrug.user.id, userDrug.drug.id, userDrug.closedExpirationDate, userDrug.dateOpened, userDrug.isOpened, userDrug.isDeleted);
    }

    createUserDrugDB(userId, drugId, closedExpirationDate, dateOpened, isOpened, isDeleted) {
        let sql = "INSERT INTO userdrugs (drugId, userId, closedExpirationDate, dateOpened, isOpened, isDeleted) VALUES (" + drugId + "," + userId + ",'" + closedExpirationDate + "','" + dateOpened + "'," + isOpened + "," + isDeleted + " )";
        return this.db.runSQL(sql);
    }

    updateUserDrug(userDrugId, drugId, closedExpirationDate, dateOpened, isOpened, isDeleted) {
        let sql = "UPDATE userdrugs SET drugId =" + drugId + ", closedExpirationDate ='" + closedExpirationDate + "', dateOpened='" + dateOpened + "', isOpened = " + isOpened + ", isDeleted = " + isDeleted + " WHERE id = " + userDrugId;
        return this.db.runSQL(sql);
    }

    setUserDrugOpened(userDrugId, date) {
        return this.setUserDrugOpenedDB(userDrugId, date);
    }

    setUserDrugOpenedToday(userDrugId) {
        return this.setUserDrugOpenedDB(userDrugId, new Date());
    }

    setUserDrugOpenedDB(userDrugId, date) {
        let sql = "UPDATE userdrugs SET dateOpened = '" + date + "' WHERE userdrugs.id = " + userDrugId;
        return this.db.runSQL(sql);
    }

    getUserDrugs(userId) {
        let sql = "SELECT * FROM userdrugs WHERE userId='" + userId + "'";
        return this.db.runSQL(sql);
    }

    deleteUserDrug(userDrugId) {
        let sql = "UPDATE userdrugs SET isDeleted = true WHERE userdrugs.id = " + userDrugId;
        return this.db.runSQL(sql);
    }

    getUserDrugUserId(userDrugId) {
        let sql = "SELECT userId FROM userdrugs WHERE id='" + userDrugId + "'";
        return new Promise((resolve, reject) => {
            this.db.runSQL(sql).then((result) => {
                if (!this.db.isResultEmpty(result)) {
                    console.log(result)
                    resolve(result[0].userId);
                }
                else {
                    console.log("user drug not found");
                }
            }, (err) => {
                console.log(err);
            })
        });
    }

    validateItIsTheSameUser(userDrugId, userId) {
        return new Promise((resolve, reject) => {
            this.getUserDrugUserId(userDrugId).then((result) => {
                console.log(result)
                resolve(result === userId);

            })
        })
    }
}