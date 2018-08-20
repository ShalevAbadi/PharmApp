var DH = require('./DrugsHandler');
var UDH = require('./UserDrugsHandler');
var UH = require('./UserHandler');


var userHandler = new UH();
var drugHandler = new DH();
var userDrugsHandler = new UDH();

//var U = require('./User');
//var D = require('./Drug');
//var UD = require('./UserDrug');
//var user = new U(7, 'test3');
//var drug = new D(1, 'Acamol', 180);
//var userDrug = new UD(null, user, drug, '2013-10-22', null);
//userDrugsHandler.createUserDrug(userDrug);

//userDrugsHandler.setUserDrugOpened(7).then(console.log.bind(console));

//userDrugsHandler.deleteUserDrug(7).then(console.log.bind(console));

/*userHandler.getUser(2).then((user) => {
    console.log(user.getName());
});*/

//userHandler.createUserIfNotExist('test4', 'abc').then(console.log.bind(console));

/*userHandler.connectUser('test4', 'ab1c').then((res) => {
    console.log(res);
});*/

//drugHandler.createDrugIfNotExist(drug).then(console.log.bind(console));
drugHandler.getDrugByName('Acamol').then(console.log.bind(console));
//user.getDrugByName('Acamol').then((result) => {console.log(result[0].DaysAfterOpened)});
//userDrugsHandler.getUserDrugs(1).then(console.log.bind(console));
//userDrugsHandler.setUserDrugOpened(3, '2068-01-20').then(console.log.bind(console));
