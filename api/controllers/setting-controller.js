'use strict';

var mongoose = require('mongoose'),
    Setting = mongoose.model('Setting');

exports.list_all_settings = function (req, res) {
    Setting.find({}, function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.create_a_setting = function (req, res) {
    var new_setting = new Setting(req.body);
    new_setting.save(function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.read_a_setting = function (req, res) {
    Setting.findById(req.params.settingId, function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    }).populate('patients');
};

exports.update_a_setting = function (req, res) {
    Setting.findOneAndUpdate({ _id: req.params.settingId }, req.body, { new: true }, function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.delete_a_setting = function (req, res) {
    Setting.remove({
        _id: req.params.settingId
    }, function (err, setting) {
        if (err)
            res.send(err);
        res.json({ message: 'Setting successfully deleted' });
    });
};