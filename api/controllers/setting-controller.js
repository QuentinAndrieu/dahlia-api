'use strict';

var mongoose = require('mongoose'),
    Setting = mongoose.model('Setting');

exports.list = function (req, res) {
    Setting.find({}, function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.create = function (req, res) {
    var new_setting = new Setting(req.body);
    new_setting.save(function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.read = function (req, res) {
    Setting.findById(req.params.settingId, function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    }).populate('patients');
};

exports.update = function (req, res) {
    Setting.findOneAndUpdate({ _id: req.params.settingId }, req.body, { new: true }, function (err, setting) {
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.delete = function (req, res) {
    Setting.remove({
        _id: req.params.settingId
    }, function (err, setting) {
        if (err)
            res.send(err);
        res.json({ message: 'Setting successfully deleted' });
    });
};

exports.add_duration = function (req, res) {
    Setting.findByIdAndUpdate(
        req.params.settingId,
        { $push: { "durations": req.body.duration } },
        { safe: true, upsert: true }, function (err, setting) {
            if (err)
                res.send(err);
            console.log('setting ', setting);
        });
};

exports.delete_duration = function (req, res) {
    Setting.findByIdAndUpdate(
        req.params.settingId,
        { $pull: { "durations": req.body.duration } },
        { safe: true, upsert: true }, function (err, setting) {
            if (err)
                res.send(err);
            console.log('setting ', setting);
        });
};

exports.add_rate = function (req, res) {
    console.log('res', req.body);
    Setting.findByIdAndUpdate(
        req.params.settingId,
        { $push: { "rates": req.body.rate } },
        { safe: true, upsert: true }, function (err, setting) {
            if (err)
                res.send(err);
            console.log('setting ', setting);
        });
};

exports.delete_rate = function (req, res) {
    Setting.findByIdAndUpdate(
        req.params.settingId,
        { $pull: { "rates": req.body.rate } },
        { safe: true, upsert: true }, function (err, setting) {
            if (err)
                res.send(err);
            console.log('setting ', setting);
        });
};
