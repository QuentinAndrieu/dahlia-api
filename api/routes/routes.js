'use strict';

let PatientController = require('../controllers/patient-controller'),
  AppointmentController = require('../controllers/appointment-controller'),
  UserController = require('../controllers/user-controller'),
  HomeController = require('../controllers/home-controller'),
  AuthentificationController = require('../controllers/authentification-controller'),
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
    .get(HomeController.message);

  // authentification routes
  app.route('/register')
    .post(AuthentificationController.register);

  app.route('/register/admin')
    .post(requireAuth, isAdmin(), AuthentificationController.register_admin);

  app.route('/authenticate')
    .post(AuthentificationController.authenticate);

  // admin users routes
  app.route('/admin/users')
    .get(requireAuth, isAdmin(), UserController.listAdmin)
    .post(requireAuth, isAdmin(), UserController.saveAdmin);

  app.route('/admin/users/:userId')
    .get(requireAuth, isAdmin(), UserController.readAdmin)
    .put(requireAuth, isAdmin(), UserController.updateAdmin)
    .delete(requireAuth, isAdmin(), UserController.removeAdmin);

  // client users routes
  app.route('/user')
    .get(requireAuth, UserController.read)
    .put(requireAuth, UserController.update)
    .delete(requireAuth, UserController.delete);

  app.route('/user/password')
    .put(requireAuth, UserController.update_password);

  // admin patients routes
  app.route('/admin/patients')
    .get(requireAuth, isAdmin(), PatientController.listAdmin)
    .post(requireAuth, isAdmin(), PatientController.saveAdmin);

  app.route('/admin/patients/:patientId')
    .get(requireAuth, isAdmin(), PatientController.readAdmin)
    .put(requireAuth, isAdmin(), PatientController.updateAdmin)
    .delete(requireAuth, isAdmin(), PatientController.removeAdmin);

  // client patients routes
  app.route('/patients')
    .get(requireAuth, PatientController.list)
    .post(requireAuth, PatientController.save);

  app.route('/patients/:patientId')
    .get(requireAuth, PatientController.read)
    .put(requireAuth, PatientController.update)
    .delete(requireAuth, PatientController.delete);


  // admin appointments routes
  app.route('/admin/appointments')
    .get(requireAuth, isAdmin(), AppointmentController.listAdmin)
    .post(requireAuth, isAdmin(), AppointmentController.saveAdmin);

  app.route('/admin/appointments/:appointmentId')
    .get(requireAuth, isAdmin(), AppointmentController.readAdmin)
    .put(requireAuth, isAdmin(), AppointmentController.updateAdmin)
    .delete(requireAuth, isAdmin(), AppointmentController.removeAdmin);

  // client appointments routes
  app.route('/appointments')
    .get(requireAuth, AppointmentController.list)
    .post(requireAuth, AppointmentController.save);

  app.route('/appointments/:appointmentId')
    .get(requireAuth, AppointmentController.read)
    .put(requireAuth, AppointmentController.update)
    .delete(requireAuth, AppointmentController.delete);
};
