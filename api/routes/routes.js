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

  app.route('/dashboard')
    .get(requireAuth, authentification.dashboard);

  // users routes
  app.route('/users')
    .get(user.list)
    .post(user.create);

  app.route('/user')
    .get(requireAuth, user.read);

  app.route('/users/:userId')
    .get(user.read_by_id)
    .put(user.update)
    .delete(user.delete);

  app.route('/users/:userId/rate')
    .post(user.add_rate)
    .delete(user.delete_rate);

  app.route('/users/:userId/duration')
    .post(user.add_duration)
    .delete(user.delete_duration);

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
};
