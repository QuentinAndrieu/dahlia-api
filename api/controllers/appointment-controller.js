'use strict';

let appointment = require('../services/appointment-service');

// admin controller
exports.list_admin = function (req, res) {
    appointment.get_all_appointments(req, res);
};

exports.save_admin = function (req, res) {
    appointment.save_appointment(req, res, req.params.userId)
};

exports.read_admin = function (req, res) {
    appointment.get_appointment_by_id(req, res);
};

exports.update_admin = function (req, res) {
    appointment.update_appointment_by_id(req, res);
};

exports.delete_admin = function (req, res) {
    appointment.remove_appointment_by_id(req, res);
};


// client controller
exports.list = function (req, res) {
    appointment.get_all_appointments_from_user(res, req, req.id_user);
};

exports.save = function (req, res) {
    appointment.save_appointment(req, res, req.id_user);
};

exports.read = function (req, res) {
    appointment.get_appointment_by_id_from_user(req, res, req.id_user);
};

exports.update = function (req, res) {
    appointment.update_appointment_by_id_from_user(req, res, req.id_user);
};

exports.delete = function (req, res) {
    appointment.remove_appointment_by_id_from_user(req, res, req.id_user);
};