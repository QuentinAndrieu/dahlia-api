'use strict';

let UserService = require('../services/user.service'),
    PatientService = require('../services/patient.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    UserService.getAll().then((users) => {
        res.send({
            success: true,
            users: users
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
            user: user
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
            user: user
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
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.removeAdmin = (req, res) => {
    let userRes = {};
    let patientsRes = {};
    UserService.removeById(req.params.userId).then((user) => {
        userRes = user;
        return PatientService.removeByUserId(req.params.userId);
    }).then((patients) => {
        patientsRes = patients;
        return AppointmentService.removeByUserId(req.params.userId);
    }).then((appointments) => {
        res.send({
            success: true,
            user: userRes,
            patients: patientsRes,
            appointments: appointments
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrashAdmin = (req, res) => {
    let userRes = {};
    let patientsRes = {};
    UserService.updateToTrashById(req.params.userId).then((user) => {
        userRes = user;
        return PatientService.updateToTrashByUserId(user._id);
    }).then((patients) => {
        patientsRes = patients;
        return AppointmentService.updateToTrashByUserId(userRes._id);
    }).then((appointments) => {
        res.send({
            success: true,
            user: userRes,
            patients: patientsRes,
            appointments: appointments
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
            user: user
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
            user: user
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
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.remove = (req, res) => {
    let userRes = {};
    let patientsRes = {};
    UserService.removeById(req.user._id).then((user) => {
        userRes = user;
        return PatientService.removeByUserId(req.user._id);
    }).then((patients) => {
        patientsRes = patientsRes;
        return AppointmentService.removeByUserId(req.user._id);
    }).then((appointments) => {
        res.send({
            success: true,
            user: userRes,
            patients: patientsRes,
            appointments: appointments
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrash = (req, res) => {
    let userRes = {};
    let patientsRes = {};
    UserService.updateToTrashById(req.user._id).then((user) => {
        userRes = user;
        return PatientService.updateToTrashByUserId(user._id);
    }).then((patients) => {
        patientsRes = patients;
        return AppointmentService.updateToTrashByUserId(userRes._id);
    }).then((appointments) => {
        res.send({
            success: true,
            user: userRes,
            patients: patientsRes,
            appointments: appointments
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};