var db = require('db'),
    log = require('./logger')(module);
db.connect();

var user = require('./user/user');

function run() {
    var petya = new user.User('Petya'),
        vasya = new user.User('Vasya');

    petya.sayHello(vasya);
}

log(db.getTranslation('Connected'));
run();