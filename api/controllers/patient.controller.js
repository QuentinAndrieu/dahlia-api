//@Flow
import PatientService from '../services/patient.service';
import UserService from '../services/user.service';
import AppointmentService from '../services/appointment.service';

// admin controller
exports.listAdmin = (req: any, res: any): void => {
    PatientService.getAll().then((patients) => {
        res.send({
            success: true,
            patients: patients
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.saveAdmin = (req: any, res: any): void => {
    let patientRes = {};
    PatientService.save(req.body, req.body.id_user).then((patient) => {
        patientRes = patient;
        return UserService.addPatient(patient.id_user, patient._id);
    }).then((user) => {
        res.send({
            success: true,
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

exports.readAdmin = (req: any, res: any): void => {
    PatientService.getById(req.params.patientId).then((patient) => {
        res.send({
            success: true,
            patient: patient
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateAdmin = (req: any, res: any): void => {
    let patientRes = {};
    PatientService.updateById(req.body, req.params.patientId).then((patient) => {
        patientRes = patient;
        return UserService.getById(patient.id_user);
    }).then((user) => {
        res.send({
            success: true,
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

exports.removeAdmin = (req: any, res: any): void => {
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.removeById(req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.removeByPatientId(req.params.patientId);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.removePatientByPatientId(patientRes.id_user, req.params.patientId);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrashAdmin = (req: any, res: any): void => {
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.updateToTrashById(req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.updateToTrashByPatientId(req.params.patientId);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.getById(patientRes.id_user);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

// client controller
exports.list = (req: any, res: any): void => {
    PatientService.getAllByUserId(req.user._id).then((patients) => {
        res.send({
            success: true,
            patients: patients
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.save = (req: any, res: any): void => {
    let patientRes = {};
    PatientService.save(req.body, req.user._id).then((patient) => {
        patientRes = patient;
        return UserService.addPatient(patient.id_user, patient._id);
    }).then((user) => {
        res.send({
            success: true,
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

exports.read = (req: any, res: any): void => {
    PatientService.getByIdAndUserId(req.user._id, req.params.patientId).then((patient) => {
        res.send({
            success: true,
            patient: patient
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.update = (req: any, res: any): void => {
    let patientRes = {};
    PatientService.updateByIdAndUserId(req.body, req.user._id, req.params.patientId).then((patient) => {
        patientRes = patient;
        return UserService.getById(req.user._id);
    }).then((user) => {
        res.send({
            success: true,
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

exports.remove = (req: any, res: any): void => {
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.removeByIdAndUserId(req.user._id, req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.removeByPatientId(req.params.patientId);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.removePatientByPatientId(req.user._id, req.params.patientId);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrash = (req: any, res: any): void => {
    let patientRes = {};
    let appointmentsRes = {};
    PatientService.updateToTrashByIdAndUserId(req.user._id, req.params.patientId).then((patient) => {
        patientRes = patient;
        return AppointmentService.updateToTrashByPatientId(patientRes._id);
    }).then((appointments) => {
        appointmentsRes = appointments;
        return UserService.getById(req.user._id);
    }).then((user) => {
        res.send({
            success: true,
            patient: patientRes,
            appointments: appointmentsRes,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};