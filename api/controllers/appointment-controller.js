'use strict';

let AppointmentService = require('../services/appointment-service');

// admin controller
exports.list_admin = function (req, res) {
    AppointmentService.getAllAppointments(req, res);
};

exports.create_admin = function (req, res) {
    AppointmentService.createAppointment(req, res, req.params.userId)
};

exports.read_admin = function (req, res) {
    AppointmentService.getOneAppointmentById(req, res);
};

exports.update_admin = function (req, res) {
    AppointmentService.updateAppointmentById(req, res);
};

exports.delete_admin = function (req, res) {
    AppointmentService.removeAppointmentById(req, res);
};


// client controller
exports.list = function (req, res) {
    AppointmentService.getAllAppointmentsFromUser(res, req, req.user._id);
};

exports.create = function (req, res) {
    AppointmentService.createAppointment(req, res, req.user._id);
};

exports.read = function (req, res) {
    AppointmentService.getOneAppointmentByIdFromUser(req, res, req.user._id);
};

exports.update = function (req, res) {
    AppointmentService.updateAppointmentByIdFromUser(req, res, req.user._id);
};

exports.delete = function (req, res) {
    AppointmentService.removeAppointmentByIdFromUser(req, res, req.user._id);
};