'use strict';

let UserService = require('../services/user.service'),
    PatientService = require('../services/patient.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    UserService.getAll().then((users) => {
        res.send({
            success: true,
            content: users
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.saveAdmin = (req, res) => {
    UserService.save(req.body).then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.readAdmin = (req, res) => {
    UserService.getById(req.params.userId).then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateAdmin = (req, res) => {
    UserService.updateById(req.body).then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.removeAdmin = (req, res) => {
    let content = {};
    UserService.removeById(req.params.userId).then((user) => {
        content = user;
        return PatientService.removeByUserId(req.params.userId);
    }).then((patient) => {
        return AppointmentService.removeByUserId(req.params.userId);
    }).then((appointment) => {
        res.send({
            success: true,
            content: content
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};


// client controller
exports.read = (req, res) => {
    UserService.getById(req.user._id).then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.update = (req, res) => {
    UserService.updateById(req.body, req.user._id).then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updatePassword = (req, res) => {
    UserService.updatePasswordById(req.body.password, req.user._id).then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.remove = (req, res) => {
    let content = {};
    UserService.removeById(req.user._id).then((user) => {
        content = user;
        return PatientService.removeByUserId(req.user._id);
    }).then((patient) => {
        return AppointmentService.removeByUserId(req.user._id);
    }).then((appointment) => {
        res.send({
            success: true,
            content: content
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};