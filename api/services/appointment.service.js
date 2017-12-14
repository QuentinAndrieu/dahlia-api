'use strict';

let mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment'),
    winston = require('winston');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        winston.info('GET_ALL_APPOINTMENTS');

        Appointment.find({}, (err, appointments) => {
            if (err) {
                winston.error('GET_ALL_APPOINTMENTS_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_ALL_APPOINTMENTS_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.save = (appointment, userId) => {
    return new Promise((resolve, reject) => {
        winston.info('SAVE_APPOINTMENT');

        let new_appointment = new Appointment(appointment);
        new_appointment.id_user = userId;

        new_appointment.save((err, appointment) => {
            if (err) {
                winston.error('SAVE_APPOINTMENT_REJECTED', err);
                reject(err);
            } else {
                winston.info('SAVE_APPOINTMENT_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.getAllByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        winston.info('GET_ALL_APPOINTMENT_BY_USER_ID');

        Appointment.find({
            id_user: userId
        }, (err, appointments) => {
            if (err) {
                winston.error('GET_ALL_APPOINTMENT_BY_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_ALL_APPOINTMENT_BY_USER_ID_FULLFILED');
                resolve(appointments);
            }
        });
    });
}

exports.getById = (appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('GET_APPOINTMENT_BY_ID', appointmentId);

        Appointment.findById(appointmentId, (err, appointment) => {
            if (err) {
                winston.error('GET_APPOINTMENT_BY_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_APPOINTMENT_BY_ID_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.getByIdAndUserId = (userId, appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('GET_APPOINTMENT_BY_ID_AND_USER_ID');

        Appointment.findOne({
            _id: appointmentId,
            id_user: userId
        }, (err, appointment) => {
            if (err) {
                winston.error('GET_APPOINTMENT_BY_ID_AND_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_APPOINTMENT_BY_ID_AND_USER_ID_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.updateById = (appointment, appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_APPOINTMENT_BY_ID');

        Appointment.findOneAndUpdate(appointmentId, appointment, {
            new: true
        }, (err, appointment) => {
            if (err) {
                winston.error('UPDATE_APPOINTMENT_BY_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('UPDATE_APPOINTMENT_BY_ID_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.updateByIdAndUserId = (appointment, userId, appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_APPOINTMENT_BY_ID_AND_USER_ID');

        Appointment.findOneAndUpdate({
            _id: appointmentId,
            id_user: userId
        }, appointment, {
            new: true
        }, (err, appointment) => {
            if (err) {
                winston.error('UPDATE_APPOINTMENT_BY_ID_AND_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('UPDATE_APPOINTMENT_BY_ID_AND_USER_ID_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.removeById = (appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENT_BY_ID', appointmentId);

        Appointment.findOneAndRemove(appointmentId, (err, appointment) => {
            winston.info('APPOINTMENT', appointment);
            if (err) {
                winston.error('REMOVE_APPOINTMENT_BY_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('REMOVE_APPOINTMENT_BY_ID_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.removeByIdAndUserId = (userId, appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENT_BY_ID_AND_USER_ID');

        Appointment.findOneAndRemove({
            _id: appointmentId,
            id_user: userId
        }, (err, appointment) => {
            if (err) {
                winston.error('REMOVE_APPOINTMENT_BY_ID_AND_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('REMOVE_APPOINTMENT_BY_ID_AND_USER_ID_FULLFILED');
                resolve(appointment);
            }
        });
    });
}

exports.removeByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENTS_BY_USER_ID', userId);

        Appointment.findByIdAndRemove(userId, (err, appointments) => {
            if (err) {
                winston.error('REMOVE_APPOINTMENTS_BY_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('REMOVE_APPOINTMENTS_BY_USER_ID_FULLFILED');
                resolve(appointments);
            }
        });
    });
}

exports.removeByPatientId = (patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENTS_BY_PATIENT_ID', patientId);

        Appointment.remove({
            id_patient: patientId
        }, (err, appointments) => {
            if (err) {
                winston.error('REMOVE_APPOINTMENTS_BY_PATIENT_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('REMOVE_APPOINTMENTS_BY_PATIENT_ID_FULLFILED');
                resolve(appointments);
            }
        });
    });
}