'use strict';

let UserService = require('../services/user.service'),
    PatientService = require('../services/patient.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    UserService.getAll((err, users) => {
        if (err)
            res.send(err);

        res.send(users);
    });
};

exports.saveAdmin = (req, res) => {
    UserService.save(req.body, (err, user) => {
        if (err)
            res.send(err);

        res.send(user);
    });
};

exports.readAdmin = (req, res) => {
    UserService.getById(req.params.userId, (err, user) => {
        if (err)
            res.send(err);

        res.send(user);
    });
};

exports.updateAdmin = (req, res) => {
    UserService.updateById(req.body, req.params.userId, (err, user) => {
        if (err)
            res.send(err);

        res.send(user);
    });
};

exports.removeAdmin = (req, res) => {
    UserService.removeById(req.params.userId, (err, user) => {
        if (err)
            res.send(err);
        else
            PatientService.removeByUserId(user._id, (err, patient) => {
                if (err)
                    res.send(err);
                else
                    AppointmentService.removeByUserId(user._id, (err, appointment) => {
                        if (err)
                            res.send(err);
                        res.send(user);
                    });
            });
    });
};


// client controller
exports.read = (req, res) => {
    UserService.getById(req.user._id, (err, user) => {
        if (err)
            res.send(err);

        res.send(user);
    });
};

exports.update = (req, res) => {
    UserService.updateById(req.body, req.user._id, (err, user) => {
        if (err)
            res.send(err);

        res.send(user);
    });
};

exports.updatePassword = (req, res) => {
    UserService.updatePasswordById(req.body.password, req.user._id, (err, user) => {
        if (err)
            res.send(err);

        res.send(user);
    });
};

exports.remove = (req, res) => {
    UserService.removeById(req.user._id, (err, user) => {
        if (err)
            res.send(err);
        else {
            PatientService.removeByUserId(user._id, (err, patient) => {
                if (err)
                    res.send(err);
                else
                    AppointmentService.removeByUserId(user._id, (err, appointment) => {
                        if (err)
                            res.send(err);
                        res.send(user);
                    });
            });
        }
    });
};