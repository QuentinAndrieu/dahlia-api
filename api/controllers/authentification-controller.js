'use strict';

let authentification = require('../services/authentification-service');

exports.register = function (req, res) {
    authentification.register(req, res, 'Client');
}

exports.register_admin = function (req, res) {
    authentification.register(req, res, 'Admin');
}

exports.authenticate = function (req, res) {
    authentification.authenticate(req, res);
};