'use strict';

let authentification = require('../services/authentification-service');

exports.register = (req, res) => {
    authentification.register(req, res, 'Client');
}

exports.register_admin = (req, res) => {
    authentification.register(req, res, 'Admin');
}

exports.authenticate = (req, res) => {
    authentification.authenticate(req, res);
};