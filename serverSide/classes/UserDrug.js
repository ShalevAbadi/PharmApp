module.exports = class UserDrug {

    constructor(id, user, drug, exp, dateOpened) {
        this.id = id;
        this.user = user;
        this.drug = drug;
        this.exp = exp;
        this.dateOpened = dateOpened;
    }

    getId() {
        return this.id;
    }

    getUser() {
        return this.user;
    }

    getDrug() {
        return this.drug;
    }

    getExp() {
        return this.exp;
    }

    getDateOpened() {
        return this.dateOpened;
    }

}