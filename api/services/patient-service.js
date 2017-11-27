'use strict';

let mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    User = mongoose.model('User');

exports.getAll = (req, res) => {
    Patient.find({}, (err, patient) => {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.getAllUser = (req, res, userId) => {
    Patient.findOne({ id_user: userId }, (err, patient) => {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.getById = (req, res) => {
    Patient.findById(req.params.patientId, (err, patient) => {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

exports.getByIdAndUserId = (req, res, userId) => {
    Patient.findOne({
        _id: req.params.patientId,
        id_user: userId
    }, (err, patient) => {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

exports.save = (req, res, userId) => {
    let new_patient = new Patient(req.body);
    new_patient.id_user = userId;

    // Add patient in user
    User.findByIdAndUpdate(
        userId,
        { $push: { patients: new_patient._id } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                res.send(err);
        });

    new_patient.save((err, patient) => {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.updateById = (req, res) => {
    Patient.findOneAndUpdate({ _id: req.params.patientId },
        req.body, { new: true }, (err, patient) => {
            if (err)
                res.send(err);
            res.json(patient);
        });
}

exports.updateByIdAndUserId = (req, res, userId) => {
    Patient.findOneAndUpdate({
        _id: req.params.patientId,
        id_user: userId
    }, req.body, { new: true }, (err, patient) => {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.removeById = (req, res) => {
    // Delete patient in user
    User.findByIdAndUpdate(
        req.body.id_user,
        { $pull: { patients: req.params.patientId } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                res.send(err);
        });

    Patient.remove({ _id: req.params.patientId }, (err, patient) => {
        if (err)
            res.send(err);
        res.json({ message: 'Patient successfully deleted' });
    }).then(() => {
        Appointment.remove({ id_patient: req.params.patientId }, (err, appointment) => {
            User.findByIdAndUpdate(
                userId,
                { $pull: { appointments: appointment._id } },
                { safe: true, upsert: true }, (err, user) => {
                    if (err)
                        res.send(err);
                });
            if (err)
                res.send(err);
        });
    });
}

exports.removeByIdAndUserId = (req, res, userId) => {
    // Delete patient in user
    User.findByIdAndUpdate(
        userId,
        { $pull: { patients: req.params.patientId } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                res.send(err);
        });

    Patient.findOneAndRemove({
        _id: req.params.patientId,
        id_user: userId
    }, (err, patient) => {
        if (err)
            res.send(err);
        res.json({ message: 'Patient successfully deleted' });
    }).then(() => {
        Appointment.remove({ id_patient: req.params.patientId }, (err, appointment) => {
            User.findByIdAndUpdate(
                userId,
                { $pull: { appointments: appointment._id } },
                { safe: true, upsert: true }, (err, user) => {
                    if (err)
                        res.send(err);
                });
            if (err)
                res.send(err);
        });
    });
}