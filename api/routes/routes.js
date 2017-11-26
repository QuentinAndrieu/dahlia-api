'use strict';

let patient = require('../controllers/patient-controller'),
  appointment = require('../controllers/appointment-controller'),
  user = require('../controllers/user-controller'),
  home = require('../controllers/home-controller'),
  authentification = require('../controllers/authentification-controller'),
  passport = require('passport');

module.exports = (app) => {

  const requireAuth = passport.authenticate('jwt', { session: false });

  require('../../config/passport')(passport);

  const isAdmin = () => {
    return (req, res, next) => {
      if (req.user && req.user.role === 'Admin')
        next();
      else
        res.send(401, 'Unauthorized');
    };
  };

  // home routes
  app.route('/')
    .get(home.message_home);

  // authentification routes
  app.route('/register')
    .post(authentification.register);

  app.route('/register/admin')
    .post(requireAuth, isAdmin(), authentification.register_admin);

  app.route('/authenticate')
    .post(authentification.authenticate);

  // admin users routes
  app.route('/admin/users')
    .get(requireAuth, isAdmin(), user.list_admin)
    .post(requireAuth, isAdmin(), user.save_admin);

  app.route('/admin/users/:userId')
    .get(requireAuth, isAdmin(), user.read_admin)
    .put(requireAuth, isAdmin(), user.update_admin)
    .delete(requireAuth, isAdmin(), user.delete_admin);

  app.route('/admin/users/:userId/rate')
    .post(requireAuth, isAdmin(), user.add_rate_admin)
    .delete(requireAuth, isAdmin(), user.delete_rate_admin);

  app.route('/admin/users/:userId/duration')
    .post(requireAuth, isAdmin(), user.add_duration_admin)
    .delete(requireAuth, isAdmin(), user.delete_duration_admin);

  // client users routes
  app.route('/user')
    .get(requireAuth, user.read)
    .put(requireAuth, user.update)
    .delete(requireAuth, user.delete);

  app.route('/user/password')
    .put(requireAuth, user.update_password);

  app.route('/user/rate')
    .post(requireAuth, user.add_rate)
    .delete(requireAuth, user.delete_rate);

  app.route('/user/duration')
    .post(requireAuth, user.add_duration)
    .delete(requireAuth, user.delete_duration);


  // admin patients routes
  app.route('/admin/patients')
    .get(requireAuth, isAdmin(), patient.list_admin)
    .post(requireAuth, isAdmin(), patient.save_admin);

  app.route('/admin/patients/:patientId')
    .get(requireAuth, isAdmin(), patient.read_admin)
    .put(requireAuth, isAdmin(), patient.update_admin)
    .delete(requireAuth, isAdmin(), patient.delete_admin);

  // client patients routes
  app.route('/patients')
    .get(requireAuth, patient.list)
    .post(requireAuth, patient.save);

  app.route('/patients/:patientId')
    .get(requireAuth, patient.read)
    .put(requireAuth, patient.update)
    .delete(requireAuth, patient.delete);


  // admin appointments routes
  app.route('/admin/appointments')
    .get(requireAuth, isAdmin(), appointment.list_admin)
    .post(requireAuth, isAdmin(), appointment.save_admin);

  app.route('/admin/appointments/:appointmentId')
    .get(requireAuth, isAdmin(), appointment.read_admin)
    .put(requireAuth, isAdmin(), appointment.update_admin)
    .delete(requireAuth, isAdmin(), appointment.delete_admin);

  // client appointments routes
  app.route('/appointments')
    .get(requireAuth, appointment.list)
    .post(requireAuth, appointment.save);

  app.route('/appointments/:appointmentId')
    .get(requireAuth, appointment.read)
    .put(requireAuth, appointment.update)
    .delete(requireAuth, appointment.delete);
};
