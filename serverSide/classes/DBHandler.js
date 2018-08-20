const Promise = require('promise');
const dbCon = require('./dbConnection');


function isResultEmpty(result) {
    return (typeof result == 'undifined' || result.length < 1 || result === null);
};

function runSQL(sql) {
    return new Promise((resolve, reject) => {
        dbCon.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { runSQL, isResultEmpty};