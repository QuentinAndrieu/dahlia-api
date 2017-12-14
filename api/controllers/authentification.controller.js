'use strict';

let AuthentificationService = require('../services/authentification.service');

exports.register = (req, res) => {
    AuthentificationService.register(req.body, 'Client').then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
}

exports.registerAdmin = (req, res) => {
    AuthentificationService.register(req.body, 'Admin').then((user) => {
        res.send({
            success: true,
            content: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
}

exports.authenticate = (req, res) => {
    AuthentificationService.authenticate(req.body.mail, req.body.password).then((token) => {
        res.send({
            success: true,
            content: token
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};