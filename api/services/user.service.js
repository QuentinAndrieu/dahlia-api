//@Flow
import mongoose from 'mongoose';
import winston from 'winston';
import { IUser } from '../interfaces/user.interface';

let User = mongoose.model('User');

exports.save = (user: IUser): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('SAVE_USER');

        let new_user = new User(user);
        new_user.save((err, user) => {
            if (err) {
                winston.error('SAVE_USER_REJECTED', err);
                reject(err);
            } else {
                winston.info('SAVE_USER_FULLFILED');
                resolve(user);
            }
        });
    });
}

exports.getAll = (): Promise<IUser[]> => {
    return new Promise((resolve, reject) => {
        winston.info('GET_ALL_USERS');

        User.find({}, (err, users) => {
            if (err) {
                winston.error('GET_ALL_USERS_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_ALL_USERS_FULLFILED');
                resolve(users);
            }
        });
    });
}

exports.getById = (userId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('GET_USER_BY_ID', userId);

        User.findById(userId, (err, user) => {
            if (err) {
                winston.error('GET_USER_BY_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_USER_BY_ID_FULLFILED');
                resolve(user);
            }
        }).populate({
            path: 'patients',
            populate: {
                path: 'appointments'
            }
        }).populate('appointments');
    });
}

exports.updateById = (user: IUser, userId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_USER_BY_ID', userId);

        User.findByIdAndUpdate(userId, user, {
            new: true
        }).populate({
            path: 'patients',
            populate: {
                path: 'appointments'
            }
        }).populate('appointments')
            .exec((err, user) => {
                if (err) {
                    winston.error('UPDATE_USER_BY_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('UPDATE_USER_BY_ID_FULLFILED');
                    resolve(user);
                }
            });
    });
}

exports.updatePasswordById = (password: string, userId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_USER_PASSWORD_BY_ID', userId);

        User.findById(userId, {
            new: true
        }).populate({
            path: 'patients',
            populate: {
                path: 'appointments'
            }
        }).populate('appointments')
            .exec((err, user) => {
                user.set({
                    password: password
                });
                user.save((err) => {
                    if (err) {
                        winston.error('UPDATE_USER_PASSWORD_BY_ID_REJECTED', err);
                        reject(err);
                    } else {
                        winston.info('UPDATE_USER_PASSWORD_BY_ID_FULLFILED');
                        resolve(user);
                    }
                });
            });
    });
}

exports.removeById = (userId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_USER_BY_ID', userId);

        User.findByIdAndRemove(userId, {
            new: true
        }).populate({
            path: 'patients',
            populate: {
                path: 'appointments'
            }
        }).populate('appointments')
            .exec((err, user) => {
                if (err) {
                    winston.error('REMOVE_USER_BY_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REMOVE_USER_BY_ID_FULLFILED');
                    resolve(user);
                }
            });
    });
}

exports.updateToTrashById = (userId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_USER_BY_ID', userId);

        User.findById(userId).populate({
            path: 'patients',
            populate: {
                path: 'appointments'
            }
        }).populate('appointments')
            .exec((err, user) => {
                user.set({
                    trash: true
                });
                user.save((err) => {
                    if (err) {
                        winston.error('UPDATE_TO_TRASH_USER_BY_ID_REJECTED', err);
                        reject(err);
                    } else {
                        winston.info('UPDATE_TO_TRASH_USER_BY_ID_FULLFILED');
                        resolve(user);
                    }
                });
            });
    });
}

exports.addPatient = (userId: string, patientId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('ADD_PATIENT_TO_USER');

        User.findByIdAndUpdate(
            userId, {
                $push: {
                    patients: patientId
                }
            }, {
                new: true,
                safe: true,
                upsert: true
            }).populate({
                path: 'patients',
                populate: {
                    path: 'appointments'
                }
            }).populate('appointments')
            .exec((err, user) => {
                if (err) {
                    winston.error('ADD_PATIENT_TO_USER_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('ADD_PATIENT_TO_USER_FULLFILED');
                    resolve(user);
                }
            });
    });
}

exports.removePatientByPatientId = (userId: string, patientId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_PATIENT_TO_USER');

        User.findByIdAndUpdate(
            userId, {
                $pull: {
                    patients: patientId
                }
            }, {
                new: true,
                safe: true,
                upsert: true
            }).populate({
                path: 'patients',
                populate: {
                    path: 'appointments'
                }
            }).populate('appointments')
            .exec((err, user) => {
                if (err) {
                    winston.error('REMOVE_PATIENT_TO_USER_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REMOVE_PATIENT_TO_USER_FULLFILED');
                    resolve(user);
                }
            });
    });
}

exports.addAppointment = (userId: string, appointmentId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('ADD_APPOINTMENT_TO_USER');

        User.findByIdAndUpdate(
            userId, {
                $push: {
                    appointments: appointmentId
                }
            }, {
                new: true,
                safe: true,
                upsert: true
            }).populate({
                path: 'patients',
                populate: {
                    path: 'appointments'
                }
            }).populate('appointments')
            .exec((err, user) => {
                if (err) {
                    winston.error('ADD_APPOINTMENT_TO_USER_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('ADD_APPOINTMENT_TO_USER_FULLFILED');
                    resolve(user);
                }
            });
    });
}

exports.removeAppointment = (userId: string, appointmentId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENT_TO_USER');

        User.findByIdAndUpdate(
            userId, {
                $pull: {
                    appointments: appointmentId
                }
            }, {
                new: true,
                safe: true,
                upsert: true
            }).populate({
                path: 'patients',
                populate: {
                    path: 'appointments'
                }
            }).populate('appointments')
            .exec((err, user) => {
                if (err) {
                    winston.error('REMOVE_APPOINTMENT_TO_USER_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REMOVE_APPOINTMENT_TO_USER_FULLFILED');
                    resolve(user);
                }
            });
    });
}