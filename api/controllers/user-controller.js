'use strict';


let UserService = require('../services/user-service');

// admin controller
exports.list_admin = function (req, res) {
    UserService.getAllUsers(req, res);
};

exports.create_admin = function (req, res) {
    UserService.createUser(req, res);
};

exports.read_admin = function (req, res) {
    UserService.getOneUserById(req, res, req.params.userId);
};

exports.update_admin = function (req, res) {
    UserService.updateUserById(req, res, req.params.userId);
};

exports.delete_admin = function (req, res) {
    UserService.removeUserById(req, res, req.params.userId);
};

exports.add_rate_admin = function (req, res) {
    UserService.addRateByUserId(req, res, req.params.userId);
};

exports.delete_rate_admin = function (req, res) {
    UserService.removeRateByUserId(req, res, req.params.userId);
};

exports.add_duration_admin = function (req, res) {
    UserService.addDurationByUserId(req, res, req.params.userId);
};

exports.delete_duration_admin = function (req, res) {
    UserService.removeDurationByUserId(req, res, req.params.userId);
};


// client controller
exports.read = function (req, res) {
    UserService.getOneUserById(req, res, req.user._id);
};

exports.update = function (req, res) {
    UserService.updateUserById(req, res, req.user._id);
};

exports.update_password = function (req, res) {
    UserService.updatePasswordUserById(req, res, req.user._id);
};

exports.delete = function (req, res) {
    UserService.removeUserById(req, res, req.user._id);
};

exports.add_rate = function (req, res) {
    UserService.addRateByUserId(req, res, req.user._id);
};

exports.delete_rate = function (req, res) {
    UserService.removeRateByUserId(req, res, req.user._id);
};

exports.add_duration = function (req, res) {
    UserService.addDurationByUserId(req, res, req.user._id);
};

exports.delete_duration = function (req, res) {
    UserService.removeDurationByUserId(req, res, req.user._id);
};