'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Appointment = mongoose.model('Appointment');


// admin controller
exports.list_admin = function (req, res) {
    getAllUsers(req, res);
};

exports.create_admin = function (req, res) {
    createUser(req, res);
};

exports.read_admin = function (req, res) {
    getOneUserById(req, res, req.params.userId);
};

exports.update_admin = function (req, res) {
    updateUserById(req, res, req.params.userId);
};

exports.delete_admin = function (req, res) {
    removeUserById(req, res, req.params.userId);
};

exports.add_rate_admin = function (req, res) {
    createRateByUserId(req, res, req.params.userId);
};

exports.delete_rate_admin = function (req, res) {
    removeRateByUserId(req, res, req.params.userId);
};

exports.add_duration_admin = function (req, res) {
    createDurationByUserId(req, res, req.params.userId);
};

exports.delete_duration_admin = function (req, res) {
    removeDurationByUserId(req, res, req.params.userId);
};


// client controller
exports.read = function (req, res) {
    getOneUserById(req, res, req.user._id);
};

exports.update = function (req, res) {
    updateUserById(req, res, req.user._id);
};

exports.delete = function (req, res) {
    removeUserById(req, res, req.user._id);
};

exports.add_rate = function (req, res) {
    createRateByUserId(req, res, req.user._id);
};

exports.delete_rate = function (req, res) {
    removeRateByUserId(req, res, req.user._id);
};

exports.add_duration = function (req, res) {
    createDurationByUserId(req, res, req.user._id);
};

exports.delete_duration = function (req, res) {
    removeDurationByUserId(req, res, req.user._id);
};


// private function
function createUser(req, res) {
    let new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

function getAllUsers(req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

function getOneUserById(req, res, userId) {
    User.findById(userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).populate('patients');
}

function updateUserById(req, res, userId) {
    User.findByIdAndUpdate(userId, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

function removeUserById(req, res, userId) {
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

function createRateByUserId(req, res, userId) {
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


function removeRateByUserId(req, res, userId) {
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

function createDurationByUserId(req, res, userId) {
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

function removeDurationByUserId(req, res, userId) {
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