let User = require('../api/models/user-model'),
    Patient = require('../api/models/patient-model'),
    Appointment = require('../api/models/appointment-model'),
    config = require('../config/main'),
    mongoose = require('mongoose'),
    fs = require('fs');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

User.remove({}, (err) => {
    console.log('patient collection removed');
});

Patient.remove({}, (err) => {
    console.log('patient collection removed');
});

Appointment.remove({}, (err) => {
    console.log('appointment collection removed');
});

let users = JSON.parse(fs.readFileSync('./data-fixtures/users.json', 'utf8'));
let patients = JSON.parse(fs.readFileSync('./data-fixtures/patients.json', 'utf8'));
let appointments = JSON.parse(fs.readFileSync('./data-fixtures/appointments.json', 'utf8'));

let user_1 = new User(users.user_1);
let user_2 = new User(users.user_2);

let patient_1 = new Patient(patients.patient_1);
let patient_2 = new Patient(patients.patient_2);

//Link patients to users
patient_1.id_user = user_1._id;
patient_2.id_user = user_2._id;

let appointment_1 = new Appointment(appointments.appointment_1);
let appointment_2 = new Appointment(appointments.appointment_2);

//Link appointments to users and patients
appointment_1.id_user = user_1._id;
appointment_1.id_patient = patient_1._id;
appointment_2.id_user = user_2._id;
appointment_2.id_patient = patient_2._id;

//Update array patient in user
user_1.patients = [patient_1._id];
user_2.patients = [patient_2._id];

//Update array appointments in patient
patient_1.appointments = [appointment_1._id];
patient_2.appointments = [appointment_2._id];

user_1.save (err, => user) {
    if (err)
        console.log(err);
});

user_2.save (err, => user) {
    if (err)
        console.log(err);
});

patient_1.save();
patient_2.save();

appointment_1.save();
appointment_2.save();


mongoose.disconnect();