'use strict';

var mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    User = mongoose.model('User');

exports.list = function (req, res) {
    Patient.find({}, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
};

exports.create = function (req, res) {
    var new_patient = new Patient(req.body);

    // Create appointment in user
    User.findByIdAndUpdate(
        new_patient.id_user,
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
};

exports.read = function (req, res) {
    Patient.findById(req.params.patientId, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
};

exports.update = function (req, res) {
    Patient.findOneAndUpdate({ _id: req.params.patientId }, req.body, { new: true }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
};

exports.delete = function (req, res) {
    // Delete patient in user
    User.findByIdAndUpdate(
        req.body.id_user,
        { $pull: { "patients": req.params.patientId } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
        });

    Patient.remove({
        _id: req.params.patientId
    }, function (err, patient) {
        if (err)
            res.send(err);
        res.json({ message: 'Patient successfully deleted' });
    }).then(() => {
        Appointment.remove({ id_user: req.params.patientId });
    });
};