'use strict';

let patient = require('../services/patient-service');

// admin controller
exports.list_admin = function (req, res) {
    patient.get_all_patients(req, res);
};

exports.list_user_admin = function (req, res) {
    patient.get_all_patients_from_user(req, res, req.params.userId);
};

exports.save_admin = function (req, res) {
    patient.save_patient(req, res, req.params.userId);
};

exports.read_admin = function (req, res) {
    patient.get_patient_by_id(req, res);
};

exports.update_admin = function (req, res) {
    patient.update_patient_by_id(req, res);
};

exports.delete_admin = function (req, res) {
    patient.remove_patient_by_id(req, res);
};


// client controller
exports.list = function (req, res) {
    patient.get_all_patients_from_user(req, res, req.id_user);
};

exports.save = function (req, res) {
    patient.save_patient(req, res, req.id_user);
};

exports.read = function (req, res) {
    patient.get_patient_by_id_from_user(req, res, req.id_user);
};

exports.update = function (req, res) {
    patient.update_patient_by_id_from_user(req, res, req.id_user);
};

exports.delete = function (req, res) {
    patient.remove_patient_by_id_from_user(req, res, req.id_user);
};