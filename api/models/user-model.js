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
    patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }]
});

module.exports = mongoose.model('User', UserSchema);


