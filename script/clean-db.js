let User = require('../api/models/user-model'),
    Patient = require('../api/models/patient-model'),
    Appointment = require('../api/models/appointment-model'),
    mongoose = require('mongoose');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Dahliadb');

User.collection.dropAllIndexes();

Patient.collection.dropAllIndexes();

Appointment.collection.dropAllIndexes();

User.remove({}, function (err) {
    console.log('user collection removed');
});

Patient.remove({}, function (err) {
    console.log('patient collection removed');
});

Appointment.remove({}, function (err) {
    console.log('appointment collection removed');
});

mongoose.disconnect();