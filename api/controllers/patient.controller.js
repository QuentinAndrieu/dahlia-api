'use strict';

let PatientService = require('../services/patient.service'),
    UserService = require('../services/user.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    PatientService.getAll().then((patients) => {
        res.send({
            success: true,
            patients: patients
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.saveAdmin = (req, res) => {
    let patientRes = {};
    PatientService.save(req.body, req.body.id_user).then((patient) => {
        patientRes = patient;
        return UserService.addPatient(patient.id_user, patient._id);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
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
    PatientService.getById(req.params.patientId).then((patient) => {
        res.send({
            success: true,
            patient: patient
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateAdmin = (req, res) => {
    let patientRes = {};
    PatientService.updateById(req.body, req.params.patientId).then((patient) => {
        patientRes = patient;
        return UserService.getById(patient.id_user);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
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
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.removeById(req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.removeByPatientId(req.params.patientId);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.removePatientByPatientId(req.params.patientId);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrashAdmin = (req, res) => {
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.updateToTrashById(req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.updateToTrashByPatientId(req.params.patientId);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.getById(patientRes.id_user);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
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
            patients: patients
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.save = (req, res) => {
    let patientRes = {};
    PatientService.save(req.body, req.user._id).then((patient) => {
        patientRes = patient;
        return UserService.addPatient(patient.id_user, patient._id, patient);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            user: user
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
            patient: patient
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.update = (req, res) => {
    let patientRes = {};
    PatientService.updateByIdAndUserId(req.body, req.user._id, req.params.patientId).then((patient) => {
        patientRes = patient;
        return UserService.getById(req.user._id);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
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
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.removeByIdAndUserId(req.user._id, req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.removeByPatientId(req.params.patientId);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.removePatientByPatientId(req.user._id, req.params.patientId);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrash = (req, res) => {
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.updateToTrashByIdAndUserId(req.user._id, req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.updateToTrashByPatientId(patientRes._id);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.getById(req.user._id);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};