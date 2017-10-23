let User = require('../api/models/user-model'),
    mongoose = require('mongoose'),
    fs = require('fs');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Dahliadb');

let admins = JSON.parse(fs.readFileSync('./data-fixtures/admins.json', 'utf8'));

let admin = new User(admins.default_admin);


admin.save(function (err, admin) {
    if (err)
        console.log(err);
});

mongoose.disconnect();