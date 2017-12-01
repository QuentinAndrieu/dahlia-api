'use strict';

let PatientService = require('../services/patient.service'),
    UserService = require('../services/user.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    AppointmentService.getAll((err, appointments) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: appointments
        });
    });
};

exports.saveAdmin = (req, res) => {
    AppointmentService.save(req.body, req.body.id_user, (err, appointment) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.addAppointment(appointment.id_user, appointment._id, (err, appointment) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    PatientService.addAppointment(appointment.id_patient, appointment._id, () => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });

                        res.send({
                            success: true,
                            content: appointment
                        });
                    });
            });
    });
};

exports.readAdmin = (req, res) => {
    AppointmentService.getById(req.params.appointmentId, (err, appointment) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: appointment
        });
    });
};

exports.updateAdmin = (req, res) => {
    AppointmentService.updateById(req.body, req.params.appointmentId, (err, appointmentId) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: appointment
        });
    });
};

exports.removeAdmin = (req, res) => {
    AppointmentService.removeById(req.params.appointmentId, (err, appointment) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.removeAppointment(appointment.id_user, appointment._id, (err, user) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    PatientService.removeAppointment(appointment.id_patient, appointment._id, (err, patient) => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });

                        res.send({
                            success: true,
                            content: appointment
                        });
                    });
            });
    });
};

// client controller
exports.list = (req, res) => {
    AppointmentService.getAllByUserId(req.user._id, (err, appointments) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: appointments
        });
    });
};

exports.save = (req, res) => {
    AppointmentService.save(req.body, req.user._id, (err, appointment) => {
        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.addAppointment(appointment.id_user, appointment._id, (err, user) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    PatientService.addAppointment(appointment.id_patient, appointment._id, (err, patient) => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });

                        res.send({
                            success: true,
                            content: appointment
                        });
                    });
            });
    });
};

exports.read = (req, res) => {
    AppointmentService.getByIdAndUserId(req.user._id, req.params.appointmentId, (err, appointment) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: appointment
        });
    });
};

exports.update = (req, res) => {
    AppointmentService.updateByIdAndUserId(req.body, req.user._id, req.params.appointmentId, (err, appointment) => {
        if (err)
            res.send({
                success: false,
                error: err
            });

        res.send({
            success: true,
            content: appointment
        });
    });
};

exports.remove = (req, res) => {
    AppointmentService.removeByIdAndUserId(req.user._id, req.params.appointmentId, (err, appointment) => {

        if (err)
            res.send({
                success: false,
                error: err
            });
        else
            UserService.removeAppointment(appointment.id_user, appointment._id, (err, user) => {
                if (err)
                    res.send({
                        success: false,
                        content: err
                    });
                else
                    PatientService.removeAppointment(appointment.id_patient, appointment._id, (err, patient) => {
                        if (err)
                            res.send({
                                success: false,
                                content: err
                            });

                        res.send({
                            success: true,
                            content: appointment
                        });
                    });
            });
    });
};