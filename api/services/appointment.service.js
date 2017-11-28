'use strict';

let mongoose = require('mongoose'),
    Appointment = mongoose.model('Appointment'),
    winston = require('winston');

exports.getAll = (callback) => {
    winston.info('GET_ALL_APPOINTMENTS');

    Appointment.find({}, (err, appointments) => {
        if (err)
            winston.error('GET_ALL_APPOINTMENTS_REJECTED', err);
        else
            winston.info('GET_ALL_APPOINTMENTS_FULLFILED');

        if (callback)
            callback(err, appointments);
    });
}

exports.save = (appointment, userId, callback) => {
    winston.info('SAVE_APPOINTMENT');

    let new_appointment = new Appointment(appointment);
    new_appointment.id_user = userId;

    new_appointment.save((err, appointment) => {
        if (err)
            winston.error('SAVE_APPOINTMENT_REJECTED', err);
        else
            winston.info('SAVE_APPOINTMENT_FULLFILED');

        if (callback)
            callback(err, appointment);
    });
}

exports.getAllByUserId = (userId, callback) => {
    winston.info('GET_ALL_APPOINTMENT_BY_USER_ID');

    Appointment.find({ id_user: userId }, (err, appointments) => {
        if (err)
            winston.error('GET_ALL_APPOINTMENT_BY_USER_ID_REJECTED', err);
        else
            winston.info('GET_ALL_APPOINTMENT_BY_USER_ID_FULLFILED');

        if (callback)
            callback(err, appointments);
    });
}

exports.getById = (appointmentId, callback) => {
    winston.info('GET_APPOINTMENT_BY_ID', appointmentId);

    Appointment.findById(appointmentId, (err, appointment) => {
        if (err)
            winston.error('GET_APPOINTMENT_BY_ID_REJECTED', err);
        else
            winston.info('GET_APPOINTMENT_BY_ID_FULLFILED');

        if (callback)
            callback(err, appointment);
    });
}

exports.getByIdAndUserId = (userId, appointmentId, callback) => {
    winston.info('GET_APPOINTMENT_BY_ID_AND_USER_ID');

    Appointment.findOne({
        _id: appointmentId,
        id_user: userId
    }, (err, appointment) => {
        if (err)
            winston.error('GET_APPOINTMENT_BY_ID_AND_USER_ID_REJECTED', err);
        else
            winston.info('GET_APPOINTMENT_BY_ID_AND_USER_ID_FULLFILED');

        if (callback)
            callback(err, appointment);
    });
}

exports.updateById = (appointment, appointmentId, callback) => {
    winston.info('UPDATE_APPOINTMENT_BY_ID');

    Appointment.findOneAndUpdate(appointmentId, appointment,
        { new: true }, (err, appointment) => {
            if (err)
                winston.error('UPDATE_APPOINTMENT_BY_ID_REJECTED', err);
            else
                winston.info('UPDATE_APPOINTMENT_BY_ID_FULLFILED');

            if (callback)
                callback(err, appointment);
        });
}

exports.updateByIdAndUserId = (appointment, userId, appointmentId, callback) => {
    winston.info('UPDATE_APPOINTMENT_BY_ID_AND_USER_ID');

    Appointment.findOneAndUpdate({
        _id: appointmentId,
        id_user: userId
    }, appointment, { new: true }, (err, appointment) => {
        if (err)
            winston.error('UPDATE_APPOINTMENT_BY_ID_AND_USER_ID_REJECTED', err);
        else
            winston.info('UPDATE_APPOINTMENT_BY_ID_AND_USER_ID_FULLFILED');

        if (callback)
            callback(err, appointment);
    });
}

exports.removeById = (appointmentId, callback) => {
    winston.info('REMOVE_APPOINTMENT_BY_ID', appointmentId);

    Appointment.findOneAndRemove(appointmentId, (err, appointment) => {
        winston.info('APPOINTMENT', appointment);
        if (err)
            winston.error('REMOVE_APPOINTMENT_BY_ID_REJECTED', err);
        else
            winston.info('REMOVE_APPOINTMENT_BY_ID_FULLFILED');

        if (callback)
            callback(err, appointment);
    });
}

exports.removeByIdAndUserId = (userId, appointmentId, callback) => {
    winston.info('REMOVE_APPOINTMENT_BY_ID_AND_USER_ID');

    Appointment.findOneAndRemove({
        _id: appointmentId,
        id_user: userId
    }, (err, appointment) => {
        if (err)
            winston.error('REMOVE_APPOINTMENT_BY_ID_AND_USER_ID_REJECTED', err);
        else
            winston.info('REMOVE_APPOINTMENT_BY_ID_AND_USER_ID_FULLFILED');

        if (callback)
            callback(err, appointment);
    });
}

exports.removeByUserId = (userId, callback) => {
    winston.info('REMOVE_APPOINTMENTS_BY_USER_ID', userId);

    Appointment.findByIdAndRemove(userId, (err) => {
        if (err)
            winston.error('REMOVE_APPOINTMENTS_BY_USER_ID_REJECTED', err);
        else
            winston.info('REMOVE_APPOINTMENTS_BY_USER_ID_FULLFILED');

        if (callback)
            callback(err, appointment);
    });
}

exports.removeByPatientId = (patientId, callback) => {
    winston.info('REMOVE_APPOINTMENT_BY_PATIENT_ID', patientId);

    Appointment.remove({ id_patient: patientId }, (err, appointments) => {
        if (err)
            winston.error('REMOVE_APPOINTMENT_BY_PATIENT_ID_REJECTED', err);
        else
            winston.info('REMOVE_APPOINTMENT_BY_PATIENT_ID_FULLFILED');

        if (callback)
            callback(err, appointments);
    });
}