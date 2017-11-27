'use strict';

let mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment'),
    Patient = mongoose.model('Patient'),
    User = mongoose.model('User');

exports.get_all_appointments = (req, res) => {
    Appointment.find({}, (err, appointment) => {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.save_appointment = (req, res, userId) => {
    let new_appointment = new Appointment(req.body);
    new_appointment.id_user = userId;

    // Add appointmentId in patient
    Patient.findByIdAndUpdate(
        new_appointment.id_patient,
        { $push: { "appointments": new_appointment._id } },
        { safe: true, upsert: true }, (err, patient) => {
            if (err)
                res.send(err);
        });

    // Add patient in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "appointments": new_appointment._id } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                res.send(err);;
        });

    new_appointment.save((err, appointment) => {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.get_all_appointments_from_user = (req, res, userId) => {
    Appointment.findOne({ id_user: userId }, (err, appointment) => {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.get_appointment_by_id = (req, res) => {
    Appointment.findById(req.params.appointmentId, (err, appointment) => {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.get_appointment_by_id_from_user = (req, res, userId) => {
    Appointment.findOne({
        _id: req.params.appointmentId,
        id_user: userId
    }, (err, appointment) => {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.update_appointment_by_id = (req, res) => {
    Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, req.body, { new: true }, (err, appointment) => {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.update_appointment_by_id_from_user = (req, res, userId) => {
    Appointment.findOneAndUpdate({
        _id: req.params.appointmentId,
        id_user: userId
    }, req.body, { new: true }, (err, appointment) => {
        if (err)
            res.send(err);
        res.json(appointment);
    });
}

exports.remove_appointment_by_id = (req, res) => {
    // Delete appointment in patient
    Patient.findByIdAndUpdate(
        req.body.id_patient,
        { $pull: { "appointments.id": req.params.appointmentId } },
        { safe: true, upsert: true }, (err, patient) => {
            if (err)
                res.send(err);
        });

    Appointment.remove({ _id: req.params.appointmentId }, (err, appointment) => {
        if (err)
            res.send(err);
        res.json({ message: 'Appointment successfully deleted' });
    });
}

exports.remove_appointment_by_id_from_user = (req, res, userId) => {
    // Delete appointment in user
    User.findByIdAndUpdate(
        userId,
        { $pull: { "appointments": req.params.appointmentId } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                res.send(err);
        });

    // Delete appointment in patient
    Patient.findByIdAndUpdate(
        req.body.id_patient,
        { $pull: { "appointments": req.params.appointmentId } },
        { safe: true, upsert: true }, (err, patient) => {
            if (err)
                res.send(err);
        });

    Appointment.findOneAndRemove({
        _id: req.params.appointmentId,
        id_user: userId
    }, (err, appointment) => {
        if (err)
            res.send(err);
        res.json({ message: 'Appointment successfully deleted' });
    });
}