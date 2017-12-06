'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    winston = require('winston');


exports.save = (user, callback) => {
    winston.info('SAVE_USER');

    let new_user = new User(user);
    new_user.save((err, user) => {
        if (err)
            winston.error('SAVE_USER_REJECTED', err);
        else
            winston.info('SAVE_USER_FULLFILED');

        if (callback)
            callback(err, user);
    });
}

exports.getAll = (callback) => {
    winston.info('GET_ALL_USERS');

    User.find({}, (err, users) => {
        if (err)
            winston.error('GET_ALL_USERS_REJECTED', err);
        else
            winston.info('GET_ALL_USERS_FULLFILED');

        if (callback)
            callback(err, users);
    });
}

exports.getById = (userId, callback) => {
    winston.info('GET_USER_BY_ID', userId);

    User.findById(userId, (err, user) => {
        if (err)
            winston.error('GET_USER_BY_ID_REJECTED', err);
        else
            winston.info('GET_USER_BY_ID_FULLFILED');

        if (callback)
            callback(err, user);
    }).populate({
        path: 'patients',
        populate: { path: 'appointments' }
    }).populate('appointments');
}

exports.updateById = (user, userId, callback) => {
    winston.info('UPDATE_USER_BY_ID', userId);

    User.findByIdAndUpdate(userId, user, { new: true }, (err, user) => {
        if (err)
            winston.error('UPDATE_USER_BY_ID_REJECTED', err);
        else
            winston.info('UPDATE_USER_BY_ID_FULLFILED');

        if (callback)
            callback(err, user);
    });
}

exports.updatePasswordById = (password, userId, callback) => {
    winston.info('UPDATE_USER_PASSWORD_BY_ID', userId);

    User.findById(userId, (err, user) => {
        user.set({ password: password });
        user.save((err) => {
            if (err)
                winston.error('UPDATE_USER_PASSWORD_BY_ID_REJECTED', err);
            else
                winston.info('UPDATE_USER_PASSWORD_BY_ID_FULLFILED');

            if (callback)
                callback(err, user);
        });

    });
}

exports.removeById = (userId, callback) => {
    winston.info('REMOVE_USER_BY_ID', userId);

    User.findByIdAndRemove(userId, (err, user) => {
        if (err)
            winston.error('REMOVE_USER_BY_ID_REJECTED', err);
        else
            winston.info('REMOVE_USER_BY_ID_FULLFILED');

        if (callback)
            callback(err, user);
    });
}

exports.addPatient = (userId, patientId, callback) => {
    winston.info('ADD_PATIENT_TO_USER');
    User.findByIdAndUpdate(
        userId,
        { $push: { patients: patientId } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                winston.error('ADD_PATIENT_TO_USER_REJECTED', err);
            else
                winston.info('ADD_PATIENT_TO_USER_FULLFILED');

            if (callback)
                callback(err, user);
        });
}

exports.removePatientByPatientId = (userId, patientId, callback) => {
    winston.info('REMOVE_PATIENT_TO_USER');
    User.findByIdAndUpdate(
        userId,
        { $pull: { patients: patientId } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                winston.error('REMOVE_PATIENT_TO_USER_REJECTED', err);
            else
                winston.info('REMOVE_PATIENT_TO_USER_FULLFILED');

            if (callback)
                callback(err, user);
        });
}

exports.addAppointment = (userId, appointmentId, callback) => {
    winston.info('ADD_APPOINTMENT_TO_USER');
    User.findByIdAndUpdate(
        userId,
        { $push: { appointments: appointmentId } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                winston.error('ADD_APPOINTMENT_TO_USER_REJECTED', err);
            else
                winston.info('ADD_APPOINTMENT_TO_USER_FULLFILED');

            if (callback)
                callback(err, user);
        });
}

exports.removeAppointment = (userId, appointmentId, callback) => {
    winston.info('REMOVE_APPOINTMENT_TO_USER');
    User.findByIdAndUpdate(
        userId,
        { $pull: { appointments: appointmentId } },
        { safe: true, upsert: true }, (err, user) => {
            if (err)
                winston.error('REMOVE_APPOINTMENT_TO_USER_REJECTED', err);
            else
                winston.info('REMOVE_APPOINTMENT_TO_USER_FULLFILED');

            if (callback)
                callback(err, user);
        });
}