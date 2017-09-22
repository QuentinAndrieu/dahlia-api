'use strict';
module.exports = function (app) {
  var patient = require('../controllers/patient-controller');
  var appointment = require('../controllers/appointment-controller');
  var user = require('../controllers/user-controller');

  // patient Routes
  app.route('/patients')
    .get(patient.list_all_patients)
    .post(patient.create_a_patient);


  app.route('/patients/:patientId')
    .get(patient.read_a_patient)
    .put(patient.update_a_patient)
    .delete(patient.delete_a_patient);


  // appointment Routes
  app.route('/appointments')
    .get(appointment.list_all_appointments)
    .post(appointment.create_a_appointment);


  app.route('/appointments/:appointmentId')
    .get(appointment.read_a_appointment)
    .put(appointment.update_a_appointment)
    .delete(appointment.delete_a_appointment);


  // users Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(user.create_a_user);


  app.route('/users/:userId')
    .get(user.read_a_user)
    .put(user.update_a_user)
    .delete(user.delete_a_user);
};
