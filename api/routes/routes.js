'use strict';

module.exports = function (app) {
  var patient = require('../controllers/patient-controller');
  var appointment = require('../controllers/appointment-controller');
  var user = require('../controllers/user-controller');
  var setting = require('../controllers/setting-controller');

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


  // settings routes
  app.route('/settings')
    .get(setting.list)
    .post(setting.create);

  app.route('/settings/:settingId')
    .get(setting.read)
    .put(setting.update)
    .delete(setting.delete);

  app.route('/settings/:settingId/rates')
    .post(setting.add_rate)
    .delete(setting.delete_rate)

  app.route('/settings/:settingId/durations')
    .post(setting.add_duration)
    .delete(setting.delete_duration)
};
