'use strict';

let mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    User = mongoose.model('User');

// admin controller
exports.list_admin = function (req, res) {
    getAllPatients(req, res);
};

exports.list_user_admin = function (req, res) {
    getAllPatientsFromUser(req, res, req.params.userId);
};

exports.create_admin = function (req, res) {
    createPatient(req, res, req.params.userId);
};

exports.read_admin = function (req, res) {
    getOnePatientById(req, res);
};

exports.update_admin = function (req, res) {
    updatePatientById(req, res);
};

exports.delete_admin = function (req, res) {
    removePatientById(req, res);
};


// client controller
exports.list = function (req, res) {
    getAllPatientsFromUser(req, res, req.user._id);
};

exports.create = function (req, res) {
    createPatient(req, res, req.user._id);
};

exports.read = function (req, res) {
    getOnePatientByIdFromUser(req, res, req.user._id);
};

exports.update = function (req, res) {
    updatePatientByIdFromUser(req, res, req.user._id);
};

exports.delete = function (req, res) {
    removePatientByIdFromUser(req, res, req.user._id);
};


// private functions
function getAllPatients(req, res) {
    Patient.find({}, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

function getAllPatientsFromUser(req, res, userId) {
    Patient.findOne({ id_user: userId }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

function getOnePatientById(req, res) {
    Patient.findById(req.params.patientId, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

function getOnePatientByIdFromUser(req, res, userId) {
    Patient.findOne({
        _id: req.params.patientId,
        id_user: userId
    }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    }).populate('appointments');
}

function createPatient(req, res, userId) {
    let new_patient = new Patient(req.body);

    // Create appointment in user
    User.findByIdAndUpdate(
        userId,
        { $push: { "patients": new_patient._id } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            console.log('user ', user);
        });

    new_patient.save(function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

function updatePatientById(req, res) {
    Patient.findOneAndUpdate({ _id: req.params.patientId }, req.body, { new: true }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

function updatePatientByIdFromUser(req, res, userId) {
    Patient.findOneAndUpdate({
        _id: req.params.patientId,
        id_user: userId
    }, req.body, { new: true }, function (err, patient) {
        if (err)
            res.send(err);
        res.json(patient);
    });
}

function removePatientById(req, res) {
    // Delete patient in user
    User.findByIdAndUpdate(
        req.body.id_user,
        { $pull: { "patients": req.params.patientId } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
        });

    Patient.remove({ _id: req.params.patientId }, function (err, patient) {
        if (err)
            res.send(err);
        res.json({ message: 'Patient successfully deleted' });
    }).then(() => {
        Appointment.remove({ id_user: req.params.patientId }, function (err) {
            if (err)
                res.send(err);
        });
    });
}

function removePatientByIdFromUser(req, res, userId) {
    // Delete patient in user
    User.findByIdAndUpdate(
        userId,
        { $pull: { "patients": req.params.patientId } },
        { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
        });

    Patient.findOneAndRemove({
        _id: req.params.patientId,
        id_user: userId
    }, function (err, patient) {
        if (err)
            res.send(err);
        res.json({ message: 'Patient successfully deleted' });
    }).then(() => {
        Appointment.remove({ id_user: req.params.patientId }, function (err) {
            if (err)
                res.send(err);
        });
    });
}