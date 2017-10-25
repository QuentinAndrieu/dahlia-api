'use strict';

let user = require('../services/user-service');

// admin controller
exports.list_admin = function (req, res) {
    user.get_all_users(req, res);
};

exports.save_admin = function (req, res) {
    user.save_user(req, res);
};

exports.read_admin = function (req, res) {
    user.get_user_by_id(req, res, req.params.userId);
};

exports.update_admin = function (req, res) {
    user.update_user_by_id(req, res, req.params.userId);
};

exports.delete_admin = function (req, res) {
    user.remove_user_by_id(req, res, req.params.userId);
};

exports.add_rate_admin = function (req, res) {
    user.add_rate_by_user_id(req, res, req.params.userId);
};

exports.delete_rate_admin = function (req, res) {
    user.remove_rate_by_user_id(req, res, req.params.userId);
};

exports.add_duration_admin = function (req, res) {
    user.add_duration_by_user_id(req, res, req.params.userId);
};

exports.delete_duration_admin = function (req, res) {
    user.remove_duration_by_user_id(req, res, req.params.userId);
};


// client controller
exports.read = function (req, res) {
    user.get_user_by_id(req, res, req.user._id);
};

exports.update = function (req, res) {
    user.update_user_by_id(req, res, req.user._id);
};

exports.update_password = function (req, res) {
    user.update_user_password_by_id(req, res, req.user._id);
};

exports.delete = function (req, res) {
    user.remove_user_by_id(req, res, req.user._id);
};

exports.add_rate = function (req, res) {
    user.add_rate_by_user_id(req, res, req.user._id);
};

exports.delete_rate = function (req, res) {
    user.remove_rate_by_user_id(req, res, req.user._id);
};

exports.add_duration = function (req, res) {
    user.add_duration_by_user_id(req, res, req.user._id);
};

exports.delete_duration = function (req, res) {
    user.remove_duration_by_user_id(req, res, req.user._id);
};