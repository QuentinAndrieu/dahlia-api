'use strict';

let PatientService = require('../services/patient-service');

// admin controller
exports.listAdmin = (req, res) => {
    PatientService.getAll(req, res);
};

exports.saveAdmin = (req, res) => {
    PatientService.save(req, res, req.params.userId);
};

exports.readAdmin = (req, res) => {
    PatientService.getById(req, res);
};

exports.updateAdmin = (req, res) => {
    PatientService.updateById(req, res);
};

exports.removeAdmin = (req, res) => {
    PatientService.removeById(req, res);
};


// client controller
exports.list = (req, res) => {
    PatientService.getAllByUserId(req, res, req.user._id);
};

exports.save = (req, res) => {
    PatientService.save(req, res, req.user._id);
};

exports.read = (req, res) => {
    PatientService.getByIdAndUserId(req, res, req.user._id);
};

exports.update = (req, res) => {
    PatientService.updateByIdAndUserId(req, res, req.user._id);
};

exports.delete = (req, res) => {
    PatientService.removeByIdAndUserId(req, res, req.user._id);
};