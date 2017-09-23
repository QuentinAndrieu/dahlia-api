'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Appointment = mongoose.model('Appointment'),
    Setting = mongoose.model('Setting');

exports.list_all_users = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.read_a_user = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).populate('patients');
};

exports.update_a_user = function (req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user = function (req, res) {
    User.remove({
        _id: req.params.userId
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    }).then(() => {
        Setting.remove({
            id_user: req.params.userId
        }, function (err, setting) {
            if (err)
                res.send(err);
            res.json({ message: 'Setting successfully deleted' });
        });

        Patient.remove({
            id_user: req.params.userId
        }, function (err, patient) {
            if (err)
                res.send(err);
            res.json({ message: 'Patients successfully deleted' });
        });
    }).then(() => {
        Appointment.remove({
            id_user: req.params.userId
        }, function (err, appointment) {
            if (err)
                res.send(err);
            res.json({ message: 'Appointments successfully deleted' });
        });
    });
};