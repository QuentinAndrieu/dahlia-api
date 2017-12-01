'use strict';

let AuthentificationService = require('../services/authentification.service');

exports.register = (req, res) => {
    AuthentificationService.register(req.body, 'Client', (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
}

exports.registerAdmin = (req, res) => {
    AuthentificationService.register(req.body, 'Admin', (err, user) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: user
        });
    });
}

exports.authenticate = (req, res) => {
    AuthentificationService.authenticate(req.body.mail, req.body.password, (err, token) => {
        if (err)
            res.send({
                success: false,
                errors: err
            });

        res.send({
            success: true,
            content: token
        });
    });
};