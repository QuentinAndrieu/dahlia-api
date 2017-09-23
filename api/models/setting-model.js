'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
    id_user: {
        type: String,
        required: 'Required id_user'
    },
    durations: [{
        type: String,
        required: 'Required duration'
    }],
    rates: [{
        type: String,
        required: 'Required rate'
    }]
});

module.exports = mongoose.model('Setting', SettingSchema);


