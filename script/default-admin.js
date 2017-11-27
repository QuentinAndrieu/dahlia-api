let User = require('../api/models/user-model'),
    mongoose = require('mongoose'),
    config = require('../config/main'),
    fs = require('fs'),
    winston = require('winston');

winston.info('===========DEFAULT_ADMIN======');
winston.info('DATABASE: ', config.database);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true
}, () => {
    winston.info('===========CONNECT============');
});

let admins = JSON.parse(fs.readFileSync('./data-fixtures/admins.json', 'utf8'));
let admin = new User(admins.default_admin);

admin.save((err, admin) => {
    if (err)
        return winston.error(err);
    winston.info('Default admin save');
});

setTimeout(() => {
    winston.info('===========DISCONNECT=========');
    mongoose.disconnect();
}, 1000);