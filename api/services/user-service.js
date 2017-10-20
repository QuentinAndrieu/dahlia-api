'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Appointment = mongoose.model('Appointment');


// private function
exports.addUser = function addUser(req, res) {
    let new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.getAllUsers = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.getOneUserById = function (req, res, userId) {
    User.findById(userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).populate('patients');
}

exports.updateUserById = function (req, res, userId) {
    User.findByIdAndUpdate(userId, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.removeUserById = function (req, res, userId) {
    User.findByIdAndRemove(userId, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    }).then(() => {
        Patient.findByIdAndRemove(userId, function (err) {
            if (err)
                res.send(err);
        });
        Appointment.findByIdAndRemove(userId, function (err) {
            if (err)
                res.send(err);
        });
    });
}

exports.addRateByUserId = function (req, res, userId) {
    // Create appointment in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "setting.rates": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
}


exports.removeRateByUserId = function (req, res, userId) {
    // Remove appointment in user
    User.findByIdAndUpdate(
        userId,
        { $pull: { "setting.rates": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
}

exports.addDurationByUserId = function (req, res, userId) {
    // Create duration in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "setting.durations": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
}

exports.removeDurationByUserId = function (req, res, userId) {
    // Remove duration in user
    User.findByIdAndUpdate(
        userId,
        { $pull: { "setting.durations": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
}