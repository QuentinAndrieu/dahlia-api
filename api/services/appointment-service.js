'use strict';

let mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment'),
    Patient = mongoose.model('Patient'),
    User = mongoose.model('User');

exports.get_all_appointments = function (req, res) {
    Appointment.find({}, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.save_appointment = function (req, res, userId) {
    let new_appointment = new Appointment(req.body);
    new_appointment.id_user = userId;

    // Add appointmentId in patient
    Patient.findByIdAndUpdate(
        new_appointment.id_patient,
        { $push: { "appointments": new_appointment._id } },
        { safe: true, upsert: true }, function (err, patient) {
            if (err)
                res.send(err);
        });

    // Add patient in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "appointments": new_appointment._id } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });

    new_appointment.save(function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.get_all_appointments_from_user = function (req, res, userId) {
    Appointment.findOne({ id_user: userId }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.get_appointment_by_id = function (req, res) {
    Appointment.findById(req.params.appointmentId, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.get_appointment_by_id_from_user = function (req, res, userId) {
    Appointment.findOne({
        _id: req.params.appointmentId,
        id_user: userId
    }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}



exports.update_appointment_by_id = function (req, res) {
    Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, req.body, { new: true }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.update_appointment_by_id_from_user = function (req, res, userId) {
    Appointment.findOneAndUpdate({
        _id: req.params.appointmentId,
        id_user: userId
    }, req.body, { new: true }, function (err, appointment) {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.remove_appointment_by_id = function (req, res) {
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

exports.remove_appointment_by_id_from_user = function (req, res, userId) {
    // Delete appointment in user
    User.findByIdAndUpdate(
        userId,
        { $pull: { "appointments": req.params.appointmentId } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
        });

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