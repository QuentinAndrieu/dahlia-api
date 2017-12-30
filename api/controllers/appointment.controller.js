//@Flow
import PatientService from '../services/patient.service';
import UserService from '../services/user.service';
import AppointmentService from '../services/appointment.service';

// admin controller
exports.listAdmin = (req: any, res: any): void => {
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

exports.saveAdmin = (req: any, res: any): void => {
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



exports.saveAdmin = (req: any, res: any) => {
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

exports.readAdmin = (req: any, res: any) => {
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

exports.updateAdmin = (req: any, res: any) => {
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

exports.removeAdmin = (req: any, res: any) => {
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

exports.updateToTrashAdmin = (req: any, res: any) => {
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
exports.list = (req: any, res: any) => {
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

exports.save = (req: any, res: any) => {
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

exports.read = (req: any, res: any) => {
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

exports.update = (req: any, res: any) => {
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

exports.remove = (req: any, res: any) => {
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

exports.updateToTrash = (req: any, res: any) => {
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