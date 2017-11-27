'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Appointment = mongoose.model('Appointment');

exports.save = (req, res) => {
    let new_user = new User(req.body);
    new_user.save((err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.getAll = (req, res) => {
    User.find({}, (err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.getById = (req, res, userId) => {
    User.findById(userId, (err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    }).populate({
        path: 'patients',
        populate: { path: 'appointments' }
    }).populate('appointments');
}

exports.updateById = (req, res, userId) => {
    User.findByIdAndUpdate(userId, req.body, { new: true }, (err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.updatePasswordById = (req, res, userId) => {
    User.findById(userId, (err, user) => {
        user.set({ password: req.body.password });
        user.save((err) => {
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

exports.removeById = (req, res, userId) => {
    User.findByIdAndRemove(userId, (err, user) => {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    }).then(() => {
        Patient.findByIdAndRemove(userId, (err) => {
            if (err)
                res.send(err);
        });
        Appointment.findByIdAndRemove(userId, (err) => {
            if (err)
                res.send(err);
        });
    });
}