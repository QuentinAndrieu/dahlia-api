let User = require('../api/models/user.model'),
    Patient = require('../api/models/patient.model'),
    Appointment = require('../api/models/appointment.model'),
    config = require('../api/config/main'),
    mongoose = require('mongoose'),
    winston = require('winston');


winston.info('===========CLEAN_DB===========');

winston.info('DATABASE: ', config.database);

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true
}, () => {
    winston.info('===========CONNECT============');
});

User.collection.dropAllIndexes((err) => {
    if (err)
        return winston.error(err);
    else
        winston.info('User collection drop all indexes');
});

Patient.collection.dropAllIndexes((err) => {
    if (err)
        winston.error(err);
    else
        winston.info('User collection drop all indexes');
});

Appointment.collection.dropAllIndexes((err) => {
    if (err)
        winston.error(err);
    else
        winston.info('User collection drop all indexes');
});

User.remove({}, (err) => {
    if (err)
        winston.error(err);
    else
        winston.info('User collection removed');
});

Patient.remove({}, (err) => {
    if (err)
        winston.error(err);
    else
        winston.info('Patient collection removed');
});

Appointment.remove({}, (err) => {
    if (err)
        winston.error(err);
    else
        winston.info('Appointment collection removed');
});

setTimeout(() => {
    winston.info('===========DISCONNECT=========');
    mongoose.disconnect();
}, 1000);
