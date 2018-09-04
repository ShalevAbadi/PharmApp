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

    connectUser(user) {
        return this.connectUserDB(user.email, user.password);
    }

    connectUserDB(email, password) {
        password = this.encryptPassword(password);
        return new Promise((resolve, reject) => {
            this.getUserByEmail(email).then((result) => {
                if (!(this.db.isResultEmpty(result))) {
                    if (this.verifyConnection(result[0].password, password)) {
                        resolve(result[0]);
                    }
                    resolve(false);
                }
                else {
                    resolve(false);
                }
            }, (err) => {
                reject(err);
            }
            );
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
        let sql = "SELECT password FROM users WHERE email='" + email + "'";
        return this.db.runSQL(sql);
    }

    getUserById(userId) {
        let sql = "SELECT * FROM users WHERE userId='" + userId + "'";
        return this.db.runSQL(sql);
    }

    getUserByEmail(email) {
        let sql = "SELECT * FROM users WHERE email='" + email + "'";
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