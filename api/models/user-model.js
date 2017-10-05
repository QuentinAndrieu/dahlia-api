'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    lastname: {
        type: String,
        required: 'Required lastname'
    },
    firstname: {
        type: String,
        required: 'Required firstname'
    },
    mail: {
        type: String,
        required: 'Required mail'
    },
    password: {
        type: String,
        required: 'Required password'
    },
    setting: {
        durations: [{
            type: Number,
            required: 'Required duration'
        }],
        rates: [{
            type: Number,
            required: 'Required rate'
        }]
    },
    patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }]
});

module.exports = mongoose.model('User', UserSchema);


