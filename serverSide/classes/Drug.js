module.exports = class Drug {

    constructor(id, name, daysAfterOpened) {
        this.id = id;
        this.name = name;
        this.daysAfterOpened = daysAfterOpened;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDaysAfterOpened() {
        return this.daysAfterOpened;
    }


};