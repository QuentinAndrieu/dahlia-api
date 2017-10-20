'use strict';

let PatientService = require('../services/patient-service');

// admin controller
exports.list_admin = function (req, res) {
    PatientService.getAllPatients(req, res);
};

exports.list_user_admin = function (req, res) {
    PatientService.getAllPatientsFromUser(req, res, req.params.userId);
};

exports.create_admin = function (req, res) {
    PatientService.createPatient(req, res, req.params.userId);
};

exports.read_admin = function (req, res) {
    PatientService.getOnePatientById(req, res);
};

exports.update_admin = function (req, res) {
    PatientService.updatePatientById(req, res);
};

exports.delete_admin = function (req, res) {
    PatientService.removePatientById(req, res);
};


// client controller
exports.list = function (req, res) {
    PatientService.getAllPatientsFromUser(req, res, req.user._id);
};

exports.create = function (req, res) {
    PatientService.createPatient(req, res, req.user._id);
};

exports.read = function (req, res) {
    PatientService.getOnePatientByIdFromUser(req, res, req.user._id);
};

exports.update = function (req, res) {
    PatientService.updatePatientByIdFromUser(req, res, req.user._id);
};

exports.delete = function (req, res) {
    PatientService.removePatientByIdFromUser(req, res, req.user._id);
};