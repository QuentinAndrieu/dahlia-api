var User = require('../api/models/user-model'),
    Patient = require('../api/models/patient-model'),
    Appointment = require('../api/models/appointment-model'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Dahliadb');


User.remove({}, function (err) {
    console.log('patient collection removed');
});

Patient.remove({}, function (err) {
    console.log('patient collection removed');
});

Appointment.remove({}, function (err) {
    console.log('appointment collection removed');
});


let user_1 = new User({
    lastname: 'David',
    firstname: 'Dupont',
    mail: 'daviddupont@gmail.com',
    password: 'pass',
    settings: {
        durations: [
            40,
            50,
            60
        ],
        rates: [
            40,
            45,
            50,
            55
        ]
    }
});

let user_2 = new User({
    lastname: 'Richard',
    firstname: 'Ulrich',
    mail: 'richardulrich@gmail.com',
    password: 'pass',
    settings: {
        durations: [
            40,
            50,
            60
        ],
        rates: [
            40,
            45,
            50,
            55
        ]
    }
});

var patient_1 = new Patient({
    lastname: "David",
    firstname: "Dupont",
    birthday: "01/01/1970",
    description: "Great guy",
    id_user: user_1._id
});

var patient_2 = new Patient({
    lastname: "David",
    firstname: "Dupont",
    birthday: "01/01/1970",
    description: "Great guy",
    id_user: user_2._id
});

var appointment_1 = new Appointment({
    date: "01/01/1970",
    description: "Great appointment",
    rate: 50,
    duration: 40,
    id_user: user_1._id,
    id_patient: patient_1._id
});

var appointment_2 = new Appointment({
    date: "01/01/1970",
    description: "Great appointment",
    rate: 50,
    duration: 40,
    id_user: user_2._id,
    id_patient: patient_2._id
});

//Update array patient in user
user_1.patients = [patient_1._id];
user_2.patients = [patient_2._id];

//Update array appointments in patient
patient_1.appointments = [appointment_1._id];
patient_2.appointments = [appointment_2._id];

user_1.save();
user_2.save();

patient_1.save();
patient_2.save();

appointment_1.save();
appointment_2.save();


mongoose.disconnect();