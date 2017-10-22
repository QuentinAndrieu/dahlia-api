'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main'),
    AuthentificationService = require('../services/authentification-service');

exports.register = function (req, res) {
    AuthentificationService.register(req, res, 'Client');
}

exports.register_admin= function (req, res) {
    AuthentificationService.register(req, res, 'Admin');
}

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
exports.authenticate = function (req, res) {
    AuthentificationService.authenticate(req, res);
};