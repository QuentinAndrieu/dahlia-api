'use strict';

let PatientService = require('../services/patient.service'),
    UserService = require('../services/user.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    PatientService.getAll().then((patients) => {
        res.send({
            success: true,
            content: patients
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.saveAdmin = (req, res) => {
    let content = {};
    PatientService.save(req.body, req.body.id_user).then((patient) => {
        content = patient;
        return UserService.addPatient(patient.id_user, patient._id);
    }).then((user) => {
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

exports.readAdmin = (req, res) => {
    PatientService.getById(req.params.patientId).then((patient) => {
        res.send({
            success: true,
            content: patient
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateAdmin = (req, res) => {
    PatientService.updateById(req.body, req.params.patientId).then((patient) => {
        res.send({
            success: true,
            content: patient
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
    PatientService.removeById(req.params.patientId).then((patient) => {
        content = patient;
        return UserService.removePatientByPatientId(req.params.patientId);
    }).then((user) => {
        return AppointmentService.removeByPatientId(req.params.patientId);
    }).then((appointments) => {
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
exports.list = (req, res) => {
    PatientService.getAllByUserId(req.user._id).then((patients) => {
        res.send({
            success: true,
            content: patients
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.save = (req, res) => {
    let content = {};
    PatientService.save(req.body, req.user._id).then((patient) => {
        content = patient;
        return UserService.addPatient(patient.id_user, patient._id, patient);
    }).then((user, patient) => {
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

exports.read = (req, res) => {
    PatientService.getByIdAndUserId(req.user._id, req.params.patientId).then((patient) => {
        res.send({
            success: true,
            content: patient
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.update = (req, res) => {
    PatientService.updateByIdAndUserId(req.body, req.user._id, req.params.patientId).then((patient) => {
        res.send({
            success: true,
            content: patient
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
    PatientService.removeByIdAndUserId(req.user._id, req.params.patientId).then((patient) => {
        content = patient;
        return UserService.removePatientByPatientId(req.user._id, req.params.patientId);
    }).then((user) => {
        return AppointmentService.removeByPatientId(req.params.patientId);
    }).then((appointments) => {
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