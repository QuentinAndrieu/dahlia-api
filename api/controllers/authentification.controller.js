'use strict';

let AuthentificationService = require('../services/authentification.service');

exports.register = (req, res) => {
    AuthentificationService.register(req.body, 'Client', (err, user) => {
        if (err)
            res.send(user);

        res.send(user);
    });
}

exports.registerAdmin = (req, res) => {
    AuthentificationService.register(req.body, 'Admin', (err, user) => {
        if (err)
            res.send(user);

        res.send(user);
    });
}

exports.authenticate = (req, res) => {
    AuthentificationService.authenticate(req.body.mail, req.body.password, (response) => {
        res.send(response);
    });
};