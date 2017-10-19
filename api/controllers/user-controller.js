'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Appointment = mongoose.model('Appointment');

exports.list = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create = function (req, res) {
    let new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.read = function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).populate('patients');
};

exports.read_by_id = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).populate('patients');
};

exports.update = function (req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete = function (req, res) {
    User.remove({ _id: req.params.userId }, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    }).then(() => {
        Patient.remove({ id_user: req.params.userId }, function (err) {
            if (err)
                res.send(err);
        });
        Appointment.remove({ id_user: req.params.userId }, function (err) {
            if (err)
                res.send(err);
        });
    });
};

exports.add_rate = function (req, res) {
    // Create appointment in user
    User.findByIdAndUpdate(
        req.params.userId,
        { $push: { "setting.rates": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
};

exports.delete_rate = function (req, res) {
    // Create appointment in user
    User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { "setting.rates": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
};


exports.add_duration = function (req, res) {
    // Create appointment in user
    User.findByIdAndUpdate(
        req.params.userId,
        { $push: { "setting.durations": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
};

exports.delete_duration = function (req, res) {
    // Create appointment in user
    User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { "setting.durations": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
};
