'use strict';

let AuthentificationService = require('../services/authentification-service');

exports.register = function (req, res) {
    AuthentificationService.register(req, res, 'Client');
}

exports.register_admin = function (req, res) {
    AuthentificationService.register(req, res, 'Admin');
}

exports.authenticate = function (req, res) {
    AuthentificationService.authenticate(req, res);
};