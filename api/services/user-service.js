'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Appointment = mongoose.model('Appointment');

exports.save_user = function save_user(req, res) {
    let new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.get_all_users = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.get_user_by_id = function (req, res, userId) {
    User.findById(userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).populate('patients');
}

exports.update_user_by_id = function (req, res, userId) {
    User.findByIdAndUpdate(userId, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.update_user_password_by_id = function (req, res, userId) {
    User.findById(userId, function (err, user) {
        user.set({ password: req.body.password });
        user.save(function (err) {
            if (err) {
                return res.json({
                    success: false,
                    message: err
                });
            }
            res.json({
                success: true,
                message: 'Password successfully updated'
            });
        });

    });
}

exports.remove_user_by_id = function (req, res, userId) {
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

exports.add_rate_by_user_id = function (req, res, userId) {
    // Add appointment in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "setting.rates": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
}


exports.remove_rate_by_user_id = function (req, res, userId) {
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

exports.add_duration_by_user_id = function (req, res, userId) {
    // Add duration in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "setting.durations": req.body.value } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });
}

exports.remove_duration_by_user_id = function (req, res, userId) {
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