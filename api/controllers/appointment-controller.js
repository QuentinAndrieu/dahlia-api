'use strict';

let AppointmentService = require('../services/appointment-service');

// admin controller
exports.listAdmin = (req, res) => {
    AppointmentService.getAll(req, res);
};

exports.saveAdmin = (req, res) => {
    AppointmentService.save(req, res, req.params.userId)
};

exports.readAdmin = (req, res) => {
    AppointmentService.getById(req, res);
};

exports.updateAdmin = (req, res) => {
    AppointmentService.updateById(req, res);
};

exports.removeAdmin = (req, res) => {
    AppointmentService.removeById(req, res);
};

// client controller
exports.list = (req, res) => {
    AppointmentService.getAllByUserId(res, req, req.user._id);
};

exports.save = (req, res) => {
    AppointmentService.save(req, res, req.user._id);
};

exports.read = (req, res) => {
    AppointmentService.getByIdAndUserId(req, res, req.user._id);
};

exports.update = (req, res) => {
    AppointmentService.updateByIdAndUserId(req, res, req.user._id);
};

exports.delete = (req, res) => {
    AppointmentService.removeByIdAndUserId(req, res, req.user._id);
};