//@Flow
import { IAppointment } from '../interfaces/appointment.interface';
import mongoose from 'mongoose';
import winston from 'winston';

let Appointment = mongoose.model('Appointment');

exports.getAll = (): Promise<IAppointment[]> => {
    return new Promise((resolve, reject) => {
        winston.info('GET_ALL_APPOINTMENTS');

        Appointment.find({}, (err, appointments) => {
            if (err) {
                winston.error('GET_ALL_APPOINTMENTS_REJECTED', err);
                reject(err);
            } else {
                winston.info('GET_ALL_APPOINTMENTS_FULLFILED');
                resolve(appointments);
            }
        });
    });
}

exports.save = (appointment: IAppointment, userId: string): Promise<IAppointment> => {
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

exports.getAllByUserId = (userId: string): Promise<IAppointment[]> => {
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

exports.getById = (appointmentId: string): Promise<IAppointment> => {
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

exports.getByIdAndUserId = (userId: string, appointmentId: string): Promise<IAppointment[]> => {
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

exports.updateById = (appointment: IAppointment, appointmentId: string): Promise<IAppointment> => {
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

exports.updateByIdAndUserId = (appointment: IAppointment, userId: string, appointmentId: string): Promise<IAppointment> => {
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

exports.removeById = (appointmentId: string): Promise<IAppointment> => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENT_BY_ID', appointmentId);

        Appointment.findOneAndRemove(appointmentId, {
            new: true
        }, (err, appointment) => {
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

exports.removeByIdAndUserId = (userId: string, appointmentId: string): Promise<IAppointment> => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENT_BY_ID_AND_USER_ID');

        Appointment.findOneAndRemove({
            _id: appointmentId,
            id_user: userId
        }, { new: true }, (err, appointment) => {
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

exports.removeByUserId = (userId: string): Promise<IAppointment[]> => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENTS_BY_USER_ID', userId);

        Appointment.findByIdAndRemove(userId, { new: true }, (err, appointments) => {
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

exports.updateToTrashById = (appointmentId: string): Promise<IAppointment> => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_APPOINTMENT_BY_ID', appointmentId);

        Appointment.findById(appointmentId, (err, appointment) => {
            appointment.set({
                trash: true
            });
            appointment.save((err) => {
                if (err) {
                    winston.error('UPDATE_TO_TRASH_APPOINTMENT_BY_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('UPDATE_TO_TRASH_APPOINTMENT_BY_ID_FULLFILED');
                    resolve(appointment);
                }
            });
        });
    });
}

exports.updateToTrashByIdAndUserId = (userId: string, appointmentId: string): Promise<IAppointment> => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_APPOINTMENT_BY_ID_AND_USER_ID', appointmentId);

        Appointment.findOne({
            _id: appointmentId,
            id_user: userId
        }, (err, appointment) => {
            appointment.set({
                trash: true
            });
            appointment.save((err) => {
                if (err) {
                    winston.error('UPDATE_TO_TRASH_APPOINTMENT_BY_ID_AND_USER_ID_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('UPDATE_TO_TRASH_APPOINTMENT_BY_ID_AND_USER_ID_FULLFILED');
                    resolve(appointment);
                }
            });
        });
    });
}

exports.updateToTrashByUserId = (userId: string): Promise<IAppointment[]> => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_APPOINTMENTS_BY_USER_ID', userId);

        Appointment.update({
            id_user: userId
        }, { $set: { trash: true } }, { multi: true, new: true }, (err, appointments) => {
            if (err) {
                winston.error('UPDATE_TO_TRASH_APPOINTMENTS_BY_USER_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('UPDATE_TO_TRASH_APPOINTMENTS_BY_USER_ID_FULLFILED');
                resolve(appointments);
            }
        });
    });
}

exports.updateToTrashByPatientId = (patientId: string): Promise<IAppointment[]> => {
    return new Promise((resolve, reject) => {
        winston.info('UPDATE_TO_TRASH_APPOINTMENTS_BY_PATIENT_ID', patientId);

        Appointment.update({
            id_patient: patientId
        }, { $set: { trash: true } }, { multi: true, new: true }, (err, appointments) => {
            if (err) {
                winston.error('UPDATE_TO_TRASH_APPOINTMENTS_BY_PATIENT_ID_REJECTED', err);
                reject(err);
            } else {
                winston.info('UPDATE_TO_TRASH_APPOINTMENTS_BY_PATIENT_ID_FULLFILED');
                resolve(appointments);
            }
        });
    });
}

exports.removeByPatientId = (patientId: string): Promise<IAppointment[]> => {
    return new Promise((resolve, reject) => {
        winston.info('REMOVE_APPOINTMENTS_BY_PATIENT_ID', patientId);

        Appointment.remove({
            id_patient: patientId
        }, { new: true }, (err, appointments) => {
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