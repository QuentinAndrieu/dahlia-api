'use strict';

let UserService = require('../services/user.service'),
    PatientService = require('../services/patient.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    UserService.getAll((err, users) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: users
        });
    });
};

exports.saveAdmin = (req, res) => {
    UserService.save(req.body, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
};

exports.readAdmin = (req, res) => {
    UserService.getById(req.params.userId, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
};

exports.updateAdmin = (req, res) => {
    UserService.updateById(req.body, req.params.userId, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
};

exports.removeAdmin = (req, res) => {
    UserService.removeById(req.params.userId, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });
        else
            PatientService.removeByUserId(user._id, (err, patient) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    AppointmentService.removeByUserId(user._id, (err, appointment) => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });
                        res.send({
                            success: true,
                            content: user
                        });
                    });
            });
    });
};


// client controller
exports.read = (req, res) => {
    UserService.getById(req.user._id, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
};

exports.update = (req, res) => {
    UserService.updateById(req.body, req.user._id, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
};

exports.updatePassword = (req, res) => {
    UserService.updatePasswordById(req.body.password, req.user._id, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
};

exports.remove = (req, res) => {
    UserService.removeById(req.user._id, (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });
        else {
            PatientService.removeByUserId(user._id, (err, patient) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    AppointmentService.removeByUserId(user._id, (err, appointment) => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });

                        res.send({
                            success: true,
                            content: user
                        });
                    });
            });
        }
    });
};