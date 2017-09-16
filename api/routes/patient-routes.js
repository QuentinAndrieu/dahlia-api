'use strict';
module.exports = function(app) {
  var patient = require('../controllers/patient-controller');

  // patient Routes
  app.route('/patients')
    .get(patient.list_all_patients)
    .post(patient.create_a_patient);


  app.route('/patients/:patientId')
    .get(patient.read_a_patient)
    .put(patient.update_a_patient)
    .delete(patient.delete_a_patient);
};
