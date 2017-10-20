'use strict';

let mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment'),
    Patient = mongoose.model('Patient');


exports.getAllAppointments = function (req, res) {
    Appointment.find({}, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.createAppointment = function (req, res, userId) {
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

exports.getAllAppointmentsFromUser = function (req, res, userId) {
    Appointment.findOne({ id_user: userId }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.getOneAppointmentById = function (req, res) {
    Appointment.findById(req.params.appointmentId, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.getOneAppointmentByIdFromUser = function (req, res, userId) {
    Appointment.findOne({
        _id: req.params.appointmentId,
        id_user: userId
    }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}



exports.updateAppointmentById = function (req, res) {
    Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, req.body, { new: true }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.updateAppointmentByIdFromUser = function (req, res, userId) {
    Appointment.findOneAndUpdate({
        _id: req.params.appointmentId,
        id_user: userId
    }, req.body, { new: true }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.removeAppointmentById = function (req, res) {
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

exports.removeAppointmentByIdFromUser = function (req, res, userId) {
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