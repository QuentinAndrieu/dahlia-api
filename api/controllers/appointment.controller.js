'use strict';

let PatientService = require('../services/patient.service'),
    UserService = require('../services/user.service'),
    AppointmentService = require('../services/appointment.service');

// admin controller
exports.listAdmin = (req, res) => {
    AppointmentService.getAll().then((appointments) => {
        res.send({
            success: true,
            appointments: appointments
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.saveAdmin = (req, res) => {
    let appointmentRes = {};
    let userRes = {};
    AppointmentService.save(req.body, req.body.id_user).then((appointment) => {
        appointmentRes = appointment;
        return UserService.addAppointment(appointment.id_user, appointment._id);
    }).then((user) => {
        userRes = user;
        return PatientService.addAppointment(appointmentRes.id_patient, appointmentRes._id);
    }).then((patient) => {
        res.send({
            success: true,
            appointment: appointmentRes,
            user: userRes,
            patient: patient
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};



exports.saveAdmin = (req, res) => {
    let appointmentRes = {};
    let patientRes = {};
    AppointmentService.save(req.body, req.body.id_user).then((appointment) => {
        appointmentRes = appointment;
        return PatientService.addAppointment(appointment.id_patient, appointment._id);
    }).then((patient) => {
        patientRes = patient;
        return UserService.addAppointment(appointmentRes.id_user, appointmentRes._id);
    }).then((user) => {
        res.send({
            success: true,
            appointment: appointmentRes,
            user: user,
            patient: patientRes
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
            appointment: appointment
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateAdmin = (req, res) => {
    let appointmentRes = {};
    AppointmentService.updateById(req.body, req.params.appointmentId).then((appointment) => {
        appointmentRes = appointment;
        return UserService.getById(appointment.id_user);
    }).then((user) => {
        res.send({
            success: true,
            appointment: appointmentRes,
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
    let appointmentRes = {};
    let patientRes = {};
    AppointmentService.removeById(req.params.appointmentId).then((appointment) => {
        appointmentRes = appointment;
        return PatientService.removeAppointment(appointment.id_patient, appointment._id);
    }).then((patient) => {
        patientRes = patient;
        return UserService.removeAppointment(appointmentRes.id_user, appointmentRes._id);
    }).then((user) => {
        res.send({
            success: true,
            appointment: appointmentRes,
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

exports.updateToTrashAdmin = (req, res) => {
    let userRes = {};
    AppointmentService.updateToTrashById(req.params.appointmentId).then((appointment) => {
        return UserService.getById(appointment.id_user);
    }).then((appointment) => {
        res.send({
            success: true,
            appointment: appointment,
            user: userRes
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
            appointment: appointments
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.save = (req, res) => {
    let appointmentRes = {};
    let patientRes = {};
    AppointmentService.save(req.body, req.user._id).then((appointment) => {
        appointmentRes = appointment;
        return PatientService.addAppointment(appointment.id_patient, appointment._id);
    }).then((patient) => {
        patientRes = patient;
        return UserService.addAppointment(appointmentRes.id_user, appointmentRes._id);
    }).then((user) => {
        res.send({
            success: true,
            appointment: appointmentRes,
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
    AppointmentService.getByIdAndUserId(req.user._id, req.params.appointmentId).then((appointment) => {
        res.send({
            success: true,
            appointment: appointment
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.update = (req, res) => {
    let appointmentRes = {};
    AppointmentService.updateByIdAndUserId(req.body, req.user._id, req.params.appointmentId).then((appointment) => {
        appointmentRes = appointment;
        return UserService.getById(appointment.id_user);
    }).then((user) => {
        res.send({
            success: true,
            appointment: appointmentRes,
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
    let appointmentRes = {};
    let patientRes = {};
    AppointmentService.removeByIdAndUserId(req.user._id, req.params.appointmentId).then((appointment) => {
        appointmentRes = appointment;
        return PatientService.removeAppointment(appointment.id_patient, appointment._id);
    }).then((patient) => {
        patientRes = patient;
        return UserService.removeAppointment(appointmentRes.id_user, appointmentRes._id);
    }).then((user) => {
        res.send({
            success: true,
            appointment: appointmentRes,
            user: user,
            patient: patientRes

        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrash = (req, res) => {
    let appointmentRes = {};
    AppointmentService.updateToTrashByIdAndUserId(req.user._id, req.params.appointmentId).then((appointment) => {
        appointmentRes = appointment;
        return UserService.getById(appointment.id_user);
    }).then((user) => {
        res.send({
            success: true,
            appointment: appointmentRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};