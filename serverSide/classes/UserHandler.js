var User = require('./User');
const crypto = require('crypto');
var db = require('./DBHandler');

module.exports = class UserHandler {

    constructor() {
        this.db = db;
    }

    getUser(userId) {
        return this.getUserById(userId).then((result) => {
            if (!this.db.isResultEmpty(result)) {
                let user = result[0];
                return new User(user.UserId, user.UserName);
            }
        }, (err) => {
            return err;
        });
    }

    createUserIfNotExist(user) {
        user.password = this.encryptPassword(user.password);
        return new Promise((resolve, reject) => {
            this.checkIfEmailExist(user.email).then(
                (result) => {
                    if (!this.db.isResultEmpty(result)) {
                        resolve();
                    } else {
                        this.createUser(user).then((result) => {
                            if (!this.db.isResultEmpty(result)) {
                                resolve(result);
                            }
                        },
                            (err) => {
                                reject(err);
                            })
                    }
                },
                (err) => {
                    reject(err);
                });
        })
    }

    connectUser(email, password) {
        password = this.encryptPassword(password);
        return this.getUserPassword(email).then((result) => {
            if (!(this.db.isResultEmpty(result))) {
                return this.verifyConnection(result[0].Password, password);
            }
            else {
                return false;
            }
        });
    }

    checkIfEmailExist(email) {
        let sql = "SELECT email FROM users WHERE email='" + email + "'";
        return this.db.runSQL(sql);
    }

    encryptPassword(password) {
        let mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
        let encPass = mykey.update(password, 'utf8', 'hex');
        encPass += mykey.final('hex');
        return encPass;
    }

    verifyConnection(passToVar, validPass) {
        return (passToVar == validPass);
    }

    getUserPassword(email) {
        let sql = "SELECT Password FROM users WHERE email='" + email + "'";
        return this.db.runSQL(sql);
    }

    getUserById(userId) {
        let sql = "SELECT * FROM users WHERE userId='" + userId + "'";
        return this.db.runSQL(sql);
    }

    getUserByName(userName) {
        let sql = "SELECT * FROM users WHERE userName='" + userName + "'";
        return this.db.runSQL(sql);
    }

    createUser(user) {
        return this.createUserDB(user.userName, user.password, user.email);
    }

    createUserDB(name, password, email) {
        password = this.encryptPassword(password);
        let sql = "INSERT INTO users (userName, password, email) VALUES ('" + name + "','" + password + "','" + email + "')";
        return this.db.runSQL(sql);
    }
}