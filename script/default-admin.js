let User = require('../api/models/user-model'),
    mongoose = require('mongoose'),
    config = require('../config/main'),
    fs = require('fs');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
    /* other options */
  });

let admins = JSON.parse(fs.readFileSync('./data-fixtures/admins.json', 'utf8'));

let admin = new User(admins.default_admin);


admin.save((err, admin) => {
    if (err)
        console.log(err);
});

mongoose.disconnect();