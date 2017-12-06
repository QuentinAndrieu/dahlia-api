'use strict';

let mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    winston = require('winston');

exports.save = (patient, userId, callback) => {
    winston.info('SAVE_PATIENT');

    let new_patient = new Patient(patient);
    new_patient.id_user = userId;

    new_patient.save((err, patient) => {
        if (err)
            winston.error('SAVE_PATIENT_REJECTED', err);
        else
            winston.info('SAVE_PATIENT_FULLFILED');

        if (callback)
            callback(err, patient);
    });
}

exports.getAll = (callback) => {
    winston.info('GET_ALL_PATIENTS');

    Patient.find({}, (err, patients) => {
        if (err)
            winston.error('GET_ALL_PATIENTS_REJECTED', err);
        else
            winston.info('GET_ALL_PATIENTS_FULLFILED');

        if (callback)
            callback(err, patients);
    });
}

exports.getAllByUserId = (userId, callback) => {
    winston.info('GET_ALL_PATIENTS_BY_USER_ID');

    Patient.find({ id_user: userId }, (err, patients) => {
        if (err)
            winston.error('GET_ALL_PATIENTS_BY_USER_ID_REJECTED', err);
        else
            winston.info('GET_ALL_PATIENTS_BY_USER_ID_FULLFILED');

        if (callback)
            callback(err, patients);
    });
}

exports.getById = (patientId, callback) => {
    winston.info('GET_PATIENT_BY_ID', patientId);

    Patient.findById(patientId, (err, patient) => {
        if (err)
            winston.error('GET_PATIENT_BY_ID_REJECTED', err);
        else
            winston.info('GET_PATIENT_BY_ID_FULLFILED');

        if (callback)
            callback(err, patient);
    }).populate('appointments');
}

exports.getByIdAndUserId = (userId, patientId, callback) => {
    winston.info('GET_PATIENT_BY_ID_AND_USER_ID', userId, patientId);

    Patient.findOne({
        _id: patientId,
        id_user: userId
    }, (err, patient) => {
        if (err)
            winston.error('GET_PATIENT_BY_ID_AND_USER_ID_REJECTED', err);
        else
            winston.info('GET_PATIENT_BY_ID_AND_USER_ID_FULLFILED');

        if (callback)
            callback(err, patient);
    }).populate('appointments');
}



exports.updateById = (patient, patientId, callback) => {
    winston.info('UPDATE_BY_ID', patientId);

    Patient.findOneAndUpdate({ _id: patientId },
        patient, { new: true }, (err, patient) => {
            if (err)
                winston.error('UPDATE_BY_ID_REJECTED', err);
            else
                winston.info('UPDATE_BY_ID_FULLFILED');

            if (callback)
                callback(err, patient);
        }).populate('appointments');
}

exports.updateByIdAndUserId = (patient, userId, patientId, callback) => {
    winston.info('UPDATE_BY_ID_AND_USER_ID', userId, patientId);
    Patient.findOneAndUpdate({
        _id: patientId,
        id_user: userId
    }, patient, { new: true }, (err, patient) => {
        if (err)
            winston.error('UPDATE_BY_ID_AND_USER_ID_REJECTED', err);
        else
            winston.info('UPDATE_BY_ID_AND_USER_ID_FULLFILED');

        if (callback)
            callback(err, patient);
    }).populate('appointments');
}

exports.removeById = (patientId, callback) => {
    winston.info('REMOVE_BY_ID', patientId);

    Patient.findOneAndRemove(patientId, (err, patient) => {
        if (err)
            winston.error('REMOVE_BY_ID_REJECTED', err);
        else
            winston.info('REMOVE_BY_ID_FULLFILED');

        if (callback)
            callback(err, patient);
    }).populate('appointments');
}

exports.removeByIdAndUserId = (userId, patientId, callback) => {
    winston.info('REMOVE_BY_ID_AND_USER_ID', patientId);

    Patient.findOneAndRemove({
        _id: patientId,
        id_user: userId
    }, (err, patient) => {
        if (err)
            winston.error('REMOVE_BY_ID_AND_USER_ID_REJECTED', err);
        else
            winston.info('REMOVE_BY_ID_AND_USER_ID_FULLFILED');

        if (callback)
            callback(err, patient);
    }).populate('appointments');
}

exports.addAppointment = (patientId, appointmentId, callback) => {
    winston.info('ADD_APPOINTMENT_FROM_PATIENT', patientId);

    Patient.findByIdAndUpdate(
        patientId,
        { $push: { appointments: appointmentId } },
        { safe: true, upsert: true }, (err, patient) => {
            if (err)
                winston.error('ADD_APPOINTMENT_FROM_PATIENT_REJECTED', err);
            else
                winston.info('ADD_APPOINTMENT_FROM_PATIENT_FULLFILED');

            if (callback)
                callback(err, patient);
        }).populate('appointments');
}

exports.removeAppointment = (patientId, appointmentId, callback) => {
    winston.info('REMOVE_APPOINTMENT_FROM_PATIENT', patientId);

    Patient.findByIdAndUpdate(
        patientId,
        { $pull: { appointments: appointmentId } },
        { safe: true, upsert: true }, (err, patient) => {
            if (err)
                winston.error('REMOVE_APPOINTMENT_FROM_PATIENT_REJECTED', err);
            else
                winston.info('REMOVE_APPOINTMENT_FROM_PATIENT_FULLFILED');

            if (callback)
                callback(err, patient);
        }).populate('appointments');
}

exports.removeByUserId = (userId, callback) => {
    winston.info('REMOVE_PATIENTS_BY_USER_ID', userId);

    Patient.findByIdAndRemove({
        id_user: userId
    }, (err, patients) => {
        if (err)
            winston.error('REMOVE_PATIENTS_BY_USER_ID_REJECTED', err);
        else
            winston.info('REMOVE_PATIENTS_BY_USER_ID_FULLFILED');

        if (callback)
            callback(err, patients);
    }).populate('appointments');
}

