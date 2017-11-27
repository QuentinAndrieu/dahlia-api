'use strict';

let PatientService = require('../services/patient.service'),
    UserService = require('../services/user.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    PatientService.getAll((err, patients) => {
        if (err)
            res.send(err);
        res.send(patients);
    });
};

exports.saveAdmin = (req, res) => {
    PatientService.save(req.body, req.body.id_user, (err, patient) => {
        if (err)
            res.send(err);
        else
            UserService.addPatient(patient.id_user, patient._id, (err, user) => {
                if (err)
                    res.send(err);
                res.send(patient);
            });
    });
};

exports.readAdmin = (req, res) => {
    PatientService.getById(req.params.patientId, (err, patient) => {
        if (err)
            res.send(err);
        res.send(patient);
    });
};

exports.updateAdmin = (req, res) => {
    PatientService.updateById(req.body, req.params.patientId, (err, patient) => {
        if (err)
            res.send(err);
        res.send(patient);
    });
};

exports.removeAdmin = (req, res) => {
    PatientService.removeById(req.params.patientId, (err, patient) => {
        if (err)
            res.send(err);
        else
            UserService.removePatientByPatientId(patient._id, (err, user) => {
                if (err)
                    res.send(err);
                else
                    AppointmentService.removeByPatientId(patient._id, (err, appointment) => {
                        if (err)
                            res.send(err);
                        res.send(patient);
                    });
            });
    });
};


// client controller
exports.list = (req, res) => {
    PatientService.getAllByUserId(req.user._id, (err, patients) => {
        if (err)
            res.send(err);

        res.send(patients);
    });
};

exports.save = (req, res) => {
    PatientService.save(req.body, req.user._id, (err, patient) => {
        if (err)
            res.send(err);
        else
            UserService.addPatient(patient.id_user, patient._id, (err, user) => {
                if (err)
                    res.send(err);
                res.send(patient);
            });
    });
};

exports.read = (req, res) => {
    PatientService.getByIdAndUserId(req.user._id, req.params.patientId, (err, patient) => {
        if (err)
            res.send(err);
        res.send(patient);
    });
};

exports.update = (req, res) => {
    PatientService.updateByIdAndUserId(req.body, req.user._id, req.params.patientId, (err, patient) => {
        if (err)
            res.send(err);
        res.send(patient);
    });
};

exports.remove = (req, res) => {
    PatientService.removeByIdAndUserId(req.user._id, req.params.patientId, (err, patient) => {
        if (err)
            res.send(err);
        else
            UserService.removePatientByPatientId(patient._id, (err, user) => {
                if (err)
                    res.send(err);
                else
                    AppointmentService.removeByPatientId(patient._id, (err, appointment) => {
                        if (err)
                            res.send(err);
                        res.send(patient);
                    });
            });
    });
};