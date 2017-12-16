'use strict';

let mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    winston = require('winston');

exports.save = (patient, userId) => {
    return new Promise((resolve, reject) => {
        winston.info('SAVE_PATIENT');

        let new_patient = new Patient(patient);
        new_patient.id_user = userId;

        new_patient.save((err, patient) => {
            if (err) {
                winston.error('SAVE_PATIENT_REJECTED', err);
                reject(err);
            } else {
                winston.info('SAVE_PATIENT_FULLFILED');
                resolve(patient);
            }
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        winston
            .info('GET_ALL_PATIENTS');

        Patient.find({}, (err, patients) => {
            if (err) {
                winston.error('GET_ALL_PATIENTS_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_ALL_PATIENTS_FULLFILED');
                resolve(patients);
            }
        });
    });
}

exports.getAllByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        winston.info('GET_ALL_PATIENTS_BY_USER_ID');

        Patient.find({
            id_user: userId
        }, (err, patients) => {
            if (err) {
                winston.error('GET_ALL_PATIENTS_BY_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_ALL_PATIENTS_BY_USER_ID_FULLFILED');
                resolve(patients);
            }
        });
    });
}

exports.getById = (patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('GET_PATIENT_BY_ID', patientId);

        Patient.findById(patientId, (err, patient) => {
            if (err) {
                winston.error('GET_PATIENT_BY_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_PATIENT_BY_ID_FULLFILED');
                resolve(patient);
            }
        }).populate('appointments');
    });
}

exports.getByIdAndUserId = (userId, patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('GET_PATIENT_BY_ID_AND_USER_ID', userId, patientId);

        Patient.findOne({
            _id: patientId,
            id_user: userId
        }, (err, patient) => {
            if (err) {
                winston.error('GET_PATIENT_BY_ID_AND_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_PATIENT_BY_ID_AND_USER_ID_FULLFILED');
                resolve(patient);
            }
        }).populate('appointments');
    });
}



exports.updateById = (patient, patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_BY_ID', patientId);

        Patient.findOneAndUpdate({
            _id: patientId
        },
            patient, {
                new: true
            }).populate('appointments')
            .exec((err, patient) => {
                if (err) {
                    winston.error('UPDATE_BY_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('UPDATE_BY_ID_FULLFILED');
                    resolve(patient);
                }
            });
    });
}

exports.updateByIdAndUserId = (patient, userId, patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_BY_ID_AND_USER_ID', userId, patientId);

        Patient.findOneAndUpdate({
            _id: patientId,
            id_user: userId
        }, patient, {
                new: true
            }).populate('appointments')
            .exec((err, patient) => {
                if (err) {
                    winston.error('UPDATE_BY_ID_AND_USER_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('UPDATE_BY_ID_AND_USER_ID_FULLFILED');
                    resolve(patient);
                }
            });
    });
}

exports.removeById = (patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_BY_ID', patientId);

        Patient.findOneAndRemove(patientId)
            .populate('appointments')
            .exec((err, patient) => {
                if (err) {
                    winston.error('REMOVE_BY_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REMOVE_BY_ID_FULLFILED');
                    resolve(patient);
                }
            });
    });
}

exports.removeByIdAndUserId = (userId, patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_BY_ID_AND_USER_ID', patientId);

        Patient.findOneAndRemove({
            _id: patientId,
            id_user: userId
        }).populate('appointments')
            .exec((err, patient) => {
                if (err) {
                    winston.error('REMOVE_BY_ID_AND_USER_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REMOVE_BY_ID_AND_USER_ID_FULLFILED');
                    resolve(patient);
                }
            });
    });
}

exports.removeByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_PATIENTS_BY_USER_ID', userId);

        Patient.findOneAndRemove({
            id_user: userId
        }).populate('appointments')
            .exec((err, patients) => {
                if (err) {
                    winston.error('REMOVE_PATIENTS_BY_USER_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REMOVE_PATIENTS_BY_USER_ID_FULLFILED');
                    resolve(patients);
                }
            });
    });
}

exports.updateToTrashById = (patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_PATIENT_BY_ID', patientId);

        Patient.findById(patientId)
            .populate('appointments')
            .exec((err, patient) => {
                patient.set({
                    trash: true
                });
                patient.save((err) => {
                    if (err) {
                        winston.error('UPDATE_TO_TRASH_PATIENT_BY_ID_REJECTED', err);
                        reject(err);
                    } else {
                        winston.info('UPDATE_TO_TRASH_PATIENT_BY_ID_FULLFILED');
                        resolve(patient);
                    }
                });
            });
    });
}

exports.updateToTrashByIdAndUserId = (userId, patientId) => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_PATIENT_BY_ID_AND_USER_ID', patientId);

        Patient.findOne({
            _id: patientId,
            id_user: userId
        }).populate('appointments')
            .exec((err, patient) => {
                patient.set({
                    trash: true
                });
                patient.save((err) => {
                    if (err) {
                        winston.error('UPDATE_TO_TRASH_PATIENT_BY_ID_AND_USER_ID_REJECTED', err);
                        reject(err);
                    } else {
                        winston.info('UPDATE_TO_TRASH_PATIENT_BY_ID_AND_USER_ID_FULLFILED');
                        resolve(patient);
                    }
                });
            });
    });
}

exports.updateToTrashByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_PATIENTS_BY_USER_ID', userId);

        Patient.update({
            id_user: userId
        }, { $set: { trash: true } }, { multi: true })
            .populate('appointments')
            .exec((err, patient) => {
                if (err) {
                    winston.error('UPDATE_TO_TRASH_PATIENTS_BY_USER_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('UPDATE_TO_TRASH_PATIENTS_BY_USER_ID_FULLFILED');
                    resolve(patients);
                }
            });
    });
}

exports.addAppointment = (patientId, appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('ADD_APPOINTMENT_FROM_PATIENT', patientId);

        Patient.findByIdAndUpdate(
            patientId, {
                $push: {
                    appointments: appointmentId
                }
            }, {
                safe: true,
                upsert: true
            }).populate('appointments')
            .exec((err, patient) => {
                if (err) {
                    winston.error('ADD_APPOINTMENT_FROM_PATIENT_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('ADD_APPOINTMENT_FROM_PATIENT_FULLFILED');
                    resolve(patient);
                }
            });
    });
}

exports.removeAppointment = (patientId, appointmentId) => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENT_FROM_PATIENT', patientId);

        Patient.findByIdAndUpdate(
            patientId, {
                $pull: {
                    appointments: appointmentId
                }
            }, {
                safe: true,
                upsert: true
            }).populate('appointments')
            .exec((err, patient) => {
                if (err) {
                    winston.error('REMOVE_APPOINTMENT_FROM_PATIENT_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REMOVE_APPOINTMENT_FROM_PATIENT_FULLFILED');
                    resolve(patient);
                }
            });
    });
}