var drugsHandlerReq = require('./DrugsHandler');
var drugsHandler = new drugsHandlerReq();
module.exports = class Drug {

    constructor(id, name, daysAfterOpened) {
        this.id = id;
        this.name = name;
        this.daysAfterOpened = daysAfterOpened;
    }

};