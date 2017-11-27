'use strict';

let UserService = require('../services/user-service');

// admin controller
exports.listAdmin = (req, res) => {
    UserService.getAll(req, res);
};

exports.saveAdmin = (req, res) => {
    UserService.save(req, res);
};

exports.readAdmin = (req, res) => {
    UserService.getById(req, res, req.params.userId);
};

exports.updateAdmin = (req, res) => {
    UserService.updateById(req, res, req.params.userId);
};

exports.removeAdmin = (req, res) => {
    UserService.removeById(req, res, req.params.userId);
};


// client controller
exports.read = (req, res) => {
    UserService.getById(req, res, req.user._id);
};

exports.update = (req, res) => {
    UserService.updateById(req, res, req.user._id);
};

exports.update_password = (req, res) => {
    UserService.updatePasswordById(req, res, req.user._id);
};

exports.delete = (req, res) => {
    UserService.removeById(req, res, req.user._id);
};