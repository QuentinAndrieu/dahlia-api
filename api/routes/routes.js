'use strict';

let patient = require('../controllers/patient-controller'),
  appointment = require('../controllers/appointment-controller'),
  user = require('../controllers/user-controller'),
  home = require('../controllers/home-controller'),
  authentification = require('../controllers/authentification-controller'),
  passport = require('passport'),
  config = require('../../config/main');

module.exports = function (app) {

  const requireAuth = passport.authenticate('jwt', { session: false });

  require('../../config/passport')(passport);

  // home routes
  app.route('/')
    .get(home.message_home);

  // authentification routes
  app.route('/register')
    .post(authentification.register);

  app.route('/authenticate')
    .post(authentification.authenticate);

  // admin users routes
  app.route('/admin/users')
    .get(user.list_admin)
    .post(user.create_admin);

  app.route('/admin/users/:userId')
    .get(user.read_admin)
    .put(user.update_admin)
    .delete(user.delete_admin);

  app.route('/admin/users/:userId/rate')
    .post(user.add_rate_admin)
    .delete(user.delete_rate_admin);

  app.route('/admin/users/:userId/duration')
    .post(user.add_duration_admin)
    .delete(user.delete_duration_admin);

  // client users routes
  app.route('/user')
    .get(requireAuth, user.read)
    .put(requireAuth, user.update)
    .delete(requireAuth, user.delete);

  app.route('/user/rate')
    .post(requireAuth, user.add_rate)
    .delete(requireAuth, user.delete_rate);

  app.route('/user/duration')
    .post(requireAuth, user.add_duration)
    .delete(requireAuth, user.delete_duration);


  // admin patients routes
  app.route('/admin/patients')
    .get(patient.list_admin)
    .post(patient.create_admin);

  app.route('/admin/patients/:patientId')
    .get(patient.read_admin)
    .put(patient.update_admin)
    .delete(patient.delete_admin);

  // client patients routes
  app.route('/patients')
    .get(patient.list)
    .post(patient.create);

  app.route('/patients/:patientId')
    .get(patient.read)
    .put(patient.update)
    .delete(patient.delete);


  // admin appointments routes
  app.route('/admin/appointments')
    .get(appointment.list_admin)
    .post(appointment.create_admin);

  app.route('/admin/appointments/:appointmentId')
    .get(appointment.read_admin)
    .put(appointment.update_admin)
    .delete(appointment.delete_admin);

  // client appointments routes
  app.route('/appointments')
    .get(appointment.list)
    .post(appointment.create);

  app.route('/appointments/:appointmentId')
    .get(appointment.read)
    .put(appointment.update)
    .delete(appointment.delete);
};
