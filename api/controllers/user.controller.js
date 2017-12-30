//@Flow
import UserService from '../services/user.service';
import PatientService from '../services/patient.service';
import AppointmentService from '../services/appointment.service';

// admin controller
exports.listAdmin = (req: any, res: any): void => {
    UserService.getAll().then((users) => {
        res.send({
            success: true,
            users: users
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.saveAdmin = (req: any, res: any): void => {
    UserService.save(req.body).then((user) => {
        res.send({
            success: true,
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
    UserService.getById(req.params.userId).then((user) => {
        res.send({
            success: true,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateAdmin = (req: any, res: any): void => {
    UserService.updateById(req.body, req.params.userId).then((user) => {
        res.send({
            success: true,
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
    let appointmentsRes = {};
    let patientsRes = {};
    AppointmentService.removeByUserId(req.params.userId).then((appointments) => {
        appointmentsRes = appointments;
        return PatientService.removeByUserId(req.params.userId);
    }).then((patients) => {
        patientsRes = patients;
        return UserService.removeById(req.params.userId);
    }).then((user) => {
        res.send({
            success: true,
            user: user,
            patients: patientsRes,
            appointments: appointmentsRes
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrashAdmin = (req: any, res: any): void => {
    let appointmentsRes = {};
    let patientsRes = {};
    AppointmentService.updateToTrashByUserId(req.params.userId).then((appointments) => {
        appointmentsRes = appointments;
        return PatientService.updateToTrashByUserId(req.params.userId);
    }).then((patients) => {
        patientsRes = patients;
        return UserService.updateToTrashById(req.params.userId);
    }).then((user) => {
        res.send({
            success: true,
            user: user,
            patients: patientsRes,
            appointments: appointmentsRes
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};


// client controller
exports.read = (req: any, res: any): void => {
    UserService.getById(req.user._id).then((user) => {
        res.send({
            success: true,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.update = (req: any, res: any): void => {
    UserService.updateById(req.body, req.user._id).then((user) => {
        res.send({
            success: true,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updatePassword = (req: any, res: any): void => {
    UserService.updatePasswordById(req.body.password, req.user._id).then((user) => {
        res.send({
            success: true,
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
    let appointmentsRes = {};
    let patientsRes = {};
    AppointmentService.removeByUserId(req.user._id).then((appointments) => {
        appointmentsRes = appointments;
        return PatientService.removeByUserId(req.user._id);
    }).then((patients) => {
        patientsRes = patients;
        return UserService.removeById(req.user._id);
    }).then((user) => {
        res.send({
            success: true,
            user: user,
            patients: patientsRes,
            appointments: appointmentsRes
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};

exports.updateToTrash = (req: any, res: any): void => {
    let appointmentsRes = {};
    let patientsRes = {};
    AppointmentService.updateToTrashByUserId(req.user._id).then((appointments) => {
        appointmentsRes = appointments;
        return PatientService.updateToTrashByUserId(req.user._id);
    }).then((patients) => {
        patientsRes = patients;
        return UserService.updateToTrashById(req.user._id);
    }).then((user) => {
        res.send({
            success: true,
            user: user,
            patients: patientsRes,
            appointments: appointmentsRes
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};