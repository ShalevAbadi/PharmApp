module.exports = class UserDrug {

    constructor(id, user, drug, closedExpirationDate, dateOpened, isOpened, isDeleted) {
        this.id = id;
        this.user = user;
        this.drug = drug;
        this.closedExpirationDate = closedExpirationDate;
        this.dateOpened = dateOpened;
        this.isOpened = isOpened;
        this.isDeleted = isDeleted;
    }
}