'use strict';

let appointment = require('../services/appointment-service');

// admin controller
exports.list_admin = (req, res) => {
    appointment.get_all_appointments(req, res);
};

exports.save_admin = (req, res) => {
    appointment.save_appointment(req, res, req.params.userId)
};

exports.read_admin = (req, res) => {
    appointment.get_appointment_by_id(req, res);
};

exports.update_admin = (req, res) => {
    appointment.update_appointment_by_id(req, res);
};

exports.delete_admin = (req, res) => {
    appointment.remove_appointment_by_id(req, res);
};


// client controller
exports.list = (req, res) => {
    appointment.get_all_appointments_from_user(res, req, req.user._id);
};

exports.save = (req, res) => {
    appointment.save_appointment(req, res, req.user._id);
};

exports.read = (req, res) => {
    appointment.get_appointment_by_id_from_user(req, res, req.user._id);
};

exports.update = (req, res) => {
    appointment.update_appointment_by_id_from_user(req, res, req.user._id);
};

exports.delete = (req, res) => {
    appointment.remove_appointment_by_id_from_user(req, res, req.user._id);
};