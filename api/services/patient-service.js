'use strict';

let mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    User = mongoose.model('User');

exports.get_all_patients = function (req, res) {
    Patient.find({}, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.get_all_patients_from_user = function (req, res, userId) {
    Patient.findOne({ id_user: userId }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.get_patient_by_id = function (req, res) {
    Patient.findById(req.params.patientId, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

exports.get_patient_by_id_from_user = function (req, res, userId) {
    Patient.findOne({
        _id: req.params.patientId,
        id_user: userId
    }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

exports.save_patient = function (req, res, userId) {
    let new_patient = new Patient(req.body);
    new_patient.id_user = userId;

    // Add patient in user
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

exports.update_patient_by_id = function (req, res) {
    Patient.findOneAndUpdate({ _id: req.params.patientId }, req.body, { new: true }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.update_patient_by_id_from_user = function (req, res, userId) {
    Patient.findOneAndUpdate({
        _id: req.params.patientId,
        id_user: userId
    }, req.body, { new: true }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

exports.remove_patient_by_id = function (req, res) {
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

exports.remove_patient_by_id_from_user = function (req, res, userId) {
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