'use strict';

let patient = require('../services/patient-service');

// admin controller
exports.list_admin = (req, res) => {
    patient.get_all_patients(req, res);
};

exports.list_user_admin = (req, res) => {
    patient.get_all_patients_from_user(req, res, req.params.userId);
};

exports.save_admin = (req, res) => {
    patient.save_patient(req, res, req.params.userId);
};

exports.read_admin = (req, res) => {
    patient.get_patient_by_id(req, res);
};

exports.update_admin = (req, res) => {
    patient.update_patient_by_id(req, res);
};

exports.delete_admin = (req, res) => {
    patient.remove_patient_by_id(req, res);
};


// client controller
exports.list = (req, res) => {
    patient.get_all_patients_from_user(req, res, req.user._id);
};

exports.save = (req, res) => {
    patient.save_patient(req, res, req.user._id);
};

exports.read = (req, res) => {
    patient.get_patient_by_id_from_user(req, res, req.user._id);
};

exports.update = (req, res) => {
    patient.update_patient_by_id_from_user(req, res, req.user._id);
};

exports.delete = (req, res) => {
    patient.remove_patient_by_id_from_user(req, res, req.user._id);
};