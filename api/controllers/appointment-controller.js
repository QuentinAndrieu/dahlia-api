'use strict';

var mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment'),
    Patient = mongoose.model('Patient');

exports.list = function (req, res) {
    Appointment.find({}, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
};

exports.create = function (req, res) {
    var new_appointment = new Appointment(req.body);

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
};

exports.read = function (req, res) {
    Appointment.findById(req.params.appointmentId, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
};

exports.update = function (req, res) {
    Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, req.body, { new: true }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
};

exports.delete = function (req, res) {
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
};