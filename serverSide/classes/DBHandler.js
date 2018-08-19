const mysql = require('mysql');
const Promise = require('promise');

module.exports = class DBHandler {

    constructor(con) {
        this.con = con;
    }

    isResultEmpty(result) {
        return (typeof result == 'undifined' || result.length < 1 || result === null);
    }

    runSQL(sql) {
        return new Promise((resolve, reject) => {
            this.con.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

};