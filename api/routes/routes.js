'use strict';

module.exports = function (app) {
  var patient = require('../controllers/patient-controller');
  var appointment = require('../controllers/appointment-controller');
  var user = require('../controllers/user-controller');

  // patients routes
  app.route('/patients')
    .get(patient.list)
    .post(patient.create);

  app.route('/patients/:patientId')
    .get(patient.read)
    .put(patient.update)
    .delete(patient.delete);


  // appointments routes
  app.route('/appointments')
    .get(appointment.list)
    .post(appointment.create);

  app.route('/appointments/:appointmentId')
    .get(appointment.read)
    .put(appointment.update)
    .delete(appointment.delete);


  // users routes
  app.route('/users')
    .get(user.list)
    .post(user.create);

  app.route('/users/:userId')
    .get(user.read)
    .put(user.update)
    .delete(user.delete);
};
