'use strict';

let mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment'),
    Patient = mongoose.model('Patient');


// admin controller
exports.list_admin = function (req, res) {
    getAllAppointments(req, res);
};

exports.create_admin = function (req, res) {
    createAppointment(req, res, req.params.userId)
};

exports.read_admin = function (req, res) {
    getOneAppointmentById(req, res);
};

exports.update_admin = function (req, res) {
    updateAppointmentById(req, res);
};

exports.delete_admin = function (req, res) {
    removeAppointmentById(req, res);
};


// client controller
exports.list = function (req, res) {
    getAllAppointmentsFromUser(res, req, req.user._id);
};

exports.create = function (req, res) {
    createAppointment(req, res, req.user._id)
};

exports.read = function (req, res) {
    getOneAppointmentByIdFromUser(req, res, req.user._id);
};

exports.update = function (req, res) {
    updateAppointmentByIdFromUser(req, res, req.user._id);
};

exports.delete = function (req, res) {
    removeAppointmentByIdFromUser(req, res, req.user._id);
};


// private functions
function getAllAppointments(req, res) {
    Appointment.find({}, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

function createAppointment(req, res, userId) {
    let new_appointment = new Appointment(req.body);

    // Create appointment in patient
    Patient.findByIdAndUpdate(
        new_appointment.id_patient,
        { $push: { "appointments": new_appointment._id } },
        { safe: true, upsert: true }, function (err, patient) {
            if (err)
                res.send(err);
        });

    new_appointment.save(function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

function getAllAppointmentsFromUser(req, res, userId) {
    Appointment.findOne({ id_user: userId }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

function getOneAppointmentById(req, res) {
    Appointment.findById(req.params.appointmentId, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

function getOneAppointmentByIdFromUser(req, res, userId) {
    Appointment.findOne({
        _id: req.params.appointmentId,
        id_user: userId
    }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}



function updateAppointmentById(req, res) {
    Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, req.body, { new: true }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

function updateAppointmentByIdFromUser(req, res, userId) {
    Appointment.findOneAndUpdate({
        _id: req.params.appointmentId,
        id_user: userId
    }, req.body, { new: true }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

function removeAppointmentById(req, res) {
    // Delete appointment in patient
    Patient.findByIdAndUpdate(
        req.body.id_patient,
        { $pull: { "appointments.id": req.params.appointmentId } },
        { safe: true, upsert: true }, function (err, patient) {
            if (err)
                res.send(err);
        });

    Appointment.remove({ _id: req.params.appointmentId }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json({ message: 'Appointment successfully deleted' });
    });
}

function removeAppointmentByIdFromUser(req, res, userId) {
    // Delete appointment in patient
    Patient.findByIdAndUpdate(
        req.body.id_patient,
        { $pull: { "appointments.id": req.params.appointmentId } },
        { safe: true, upsert: true }, function (err, patient) {
            if (err)
                res.send(err);
        });

    Appointment.findOneAndRemove({
        _id: req.params.appointmentId,
        id_user: userId
    }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json({ message: 'Appointment successfully deleted' });
    });
}