'use strict';

let AuthentificationService = require('../services/authentification-service');

exports.register = (req, res) => {
    AuthentificationService.register(req, res, 'Client');
}

exports.register_admin = (req, res) => {
    AuthentificationService.register(req, res, 'Admin');
}

exports.authenticate = (req, res) => {
    AuthentificationService.authenticate(req, res);
};