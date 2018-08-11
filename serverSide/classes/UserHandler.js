var User = require('./User');
const crypto = require('crypto');

module.exports = class UserHandler {

    constructor(db) {
        this.db = db;
    }

    getUser(userId) {
        return this.getUserById(userId).then((result) => {
            if (!this.db.isResultEmpty(result)) {
                let user = result[0];
                return new User(user.UserId, user.UserName);
            }
        }, (err) => {
            console.log(err);
        });
    }

    createUserIfNotExist(userName, password) {
        password = this.encryptPassword(password);
        return this.getUserByName(userName)
            .then(
                (result) => {
                    if (!this.db.isResultEmpty(result)) {
                        console.log('already exist');
                    } else {
                        this.createUser(userName, password).then((result) => {
                            if (!this.db.isResultEmpty(result)) {
                                console.log('user created');
                            } else {
                                console.log('error uccured')
                            }
                        },
                            (err) => {
                                console.log(err);
                            })
                    }
                },
                (err) => {
                    console.log(err);
                });
    }

    connectUser(userName, password) {
        password = this.encryptPassword(password);
        return this.getUserPassword(userName).then((result) => {
            if (!(this.db.isResultEmpty(result))) {
                return this.verifyConnection(result[0].Password, password);
            }
            else {
                return false;
            }
        });
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

    getUserPassword(name) {
        let sql = "SELECT Password FROM users WHERE UserName='" + name + "'";
        return this.db.runSQL(sql);
    }

    getUserById(userId) {
        let sql = "SELECT * FROM users WHERE UserId='" + userId + "'";
        return this.db.runSQL(sql);
    }

    getUserByName(userName) {
        let sql = "SELECT * FROM users WHERE UserName='" + userName + "'";
        return this.db.runSQL(sql);
    }

    createUser(name, password) {
        let sql = "INSERT INTO users (UserName, Password) VALUES ('" + name + "','" + password + "')";
        return this.db.runSQL(sql);
    }
}