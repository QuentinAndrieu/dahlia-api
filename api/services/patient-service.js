'use strict';

let mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    User = mongoose.model('User');


// private functions
exports.getAllPatients = function (req, res) {
    Patient.find({}, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.getAllPatientsFromUser = function (req, res, userId) {
    Patient.findOne({ id_user: userId }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.getOnePatientById = function (req, res) {
    Patient.findById(req.params.patientId, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

exports.getOnePatientByIdFromUser = function (req, res, userId) {
    Patient.findOne({
        _id: req.params.patientId,
        id_user: userId
    }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

exports.createPatient = function (req, res, userId) {
    let new_patient = new Patient(req.body);

    // Create appointment in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "patients": new_patient._id } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });

    new_patient.save(function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.updatePatientById = function (req, res) {
    Patient.findOneAndUpdate({ _id: req.params.patientId }, req.body, { new: true }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.updatePatientByIdFromUser = function (req, res, userId) {
    Patient.findOneAndUpdate({
        _id: req.params.patientId,
        id_user: userId
    }, req.body, { new: true }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.removePatientById = function (req, res) {
    // Delete patient in user
    User.findByIdAndUpdate(
        req.body.id_user,
        { $pull: { "patients": req.params.patientId } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
        });

    Patient.remove({ _id: req.params.patientId }, function (err, patient) {
        if (err)
            res.send(err);
        res.json({ message: 'Patient successfully deleted' });
    }).then(() => {
        Appointment.remove({ id_user: req.params.patientId }, function (err) {
            if (err)
                res.send(err);
        });
    });
}

exports.removePatientByIdFromUser = function (req, res, userId) {
    // Delete patient in user
    User.findByIdAndUpdate(
        userId,
        { $pull: { "patients": req.params.patientId } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
        });

    Patient.findOneAndRemove({
        _id: req.params.patientId,
        id_user: userId
    }, function (err, patient) {
        if (err)
            res.send(err);
        res.json({ message: 'Patient successfully deleted' });
    }).then(() => {
        Appointment.remove({ id_user: req.params.patientId }, function (err) {
            if (err)
                res.send(err);
        });
    });
}