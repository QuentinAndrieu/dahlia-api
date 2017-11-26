let User = require('../api/models/user-model'),
    Patient = require('../api/models/patient-model'),
    Appointment = require('../api/models/appointment-model'),
    config = require('../config/main'),
    mongoose = require('mongoose');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
    /* other options */
});

User.collection.dropAllIndexes();

Patient.collection.dropAllIndexes();

Appointment.collection.dropAllIndexes();

User.remove({}, (err) => {
    console.log('user collection removed');
});

Patient.remove({}, (err) => {
    console.log('patient collection removed');
});

Appointment.remove({}, (err) => {
    console.log('appointment collection removed');
});

mongoose.disconnect();