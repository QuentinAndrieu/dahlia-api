'use strict';

let PatientService = require('../services/patient.service'),
    UserService = require('../services/user.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    PatientService.getAll((err, patients) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        res.send({
            success: true,
            content: patients
        });
    });
};

exports.saveAdmin = (req, res) => {
    PatientService.save(req.body, req.body.id_user, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.addPatient(patient.id_user, patient._id, (err, user) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });

                res.send({
                    success: true,
                    content: patient
                });
            });
    });
};

exports.readAdmin = (req, res) => {
    PatientService.getById(req.params.patientId, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: patient
        });
    });
};

exports.updateAdmin = (req, res) => {
    PatientService.updateById(req.body, req.params.patientId, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: patient
        });
    });
};

exports.removeAdmin = (req, res) => {
    PatientService.removeById(req.params.patientId, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.removePatientByPatientId(patient._id, (err, user) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    AppointmentService.removeByPatientId(patient._id, (err, appointment) => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });

                        res.send({
                            success: true,
                            content: patient
                        });
                    });
            });
    });
};


// client controller
exports.list = (req, res) => {
    PatientService.getAllByUserId(req.user._id, (err, patients) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: patients
        });
    });
};

exports.save = (req, res) => {
    PatientService.save(req.body, req.user._id, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.addPatient(patient.id_user, patient._id, (err, user) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });

                res.send({
                    success: true,
                    content: patient
                });
            });
    });
};

exports.read = (req, res) => {
    PatientService.getByIdAndUserId(req.user._id, req.params.patientId, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: patient
        });
    });
};

exports.update = (req, res) => {
    PatientService.updateByIdAndUserId(req.body, req.user._id, req.params.patientId, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: patient
        });
    });
};

exports.remove = (req, res) => {
    PatientService.removeByIdAndUserId(req.user._id, req.params.patientId, (err, patient) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.removePatientByPatientId(patient.id_user, patient._id, (err, user) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    AppointmentService.removeByPatientId(patient._id, (err, appointments) => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });

                        res.send({
                            success: true,
                            content: patient
                        });
                    });
            });
    });
};