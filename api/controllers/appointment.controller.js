'use strict';

let PatientService = require('../services/patient.service'),
    UserService = require('../services/user.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    AppointmentService.getAll().then((appointments) => {
        res.send({
            success: true,
            content: appointments
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
    AppointmentService.save(req.body, req.body.id_user).then((appointment) => {
        content = appointment;
        return UserService.addAppointment(appointment.id_user, appointment._id);
    }).then((user) => {
        return PatientService.addAppointment(content.id_patient, content._id);
    }).then(() => {
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
    AppointmentService.getById(req.params.appointmentId).then((appointment) => {
        res.send({
            success: true,
            content: appointment
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateAdmin = (req, res) => {
    AppointmentService.updateById(req.body, req.params.appointmentId).then((appointment) => {
        res.send({
            success: true,
            content: appointment
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
    AppointmentService.removeById(req.params.appointmentId).then((appointment) => {
        content = appointment;
        return UserService.removeAppointment(appointment.id_user, appointment._id);
    }).then((user) => {
        return PatientService.removeAppointment(content.id_patient, content._id);
    }).then(() => {
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

exports.updateToTrashAdmin = (req, res) => {
    AppointmentService.updateToTrashById(req.params.appointmentId).then((appointment) => {
        res.send({
            success: true,
            content: appointment
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
    AppointmentService.getAllByUserId(req.user._id).then((appointments) => {
        res.send({
            success: true,
            content: appointments
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
    AppointmentService.save(req.body, req.user._id).then((appointment) => {
        content = appointment;
        return UserService.addAppointment(appointment.id_user, appointment._id);
    }).then((user) => {
        return PatientService.addAppointment(content.id_patient, content._id);
    }).then(() => {
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
    AppointmentService.getByIdAndUserId(req.user._id, req.params.appointmentId).then((appointment) => {
        res.send({
            success: true,
            content: appointment
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.update = (req, res) => {
    AppointmentService.updateByIdAndUserId(req.body, req.user._id, req.params.appointmentId).then((appointment) => {
        res.send({
            success: true,
            content: appointment
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
    AppointmentService.removeByIdAndUserId(req.user._id, req.params.appointmentId).then((appointment) => {
        content = appointment;
        return UserService.removeAppointment(appointment.id_user, appointment._id);
    }).then((user) => {
        return PatientService.removeAppointment(content.id_patient, content._id);
    }).then(() => {
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

exports.updateToTrash = (req, res) => {
    AppointmentService.updateToTrashByIdAndUserId(req.user._id, req.params.appointmentId).then((appointment) => {
        res.send({
            success: true,
            content: appointment
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};