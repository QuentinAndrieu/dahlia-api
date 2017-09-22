'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    id_user: {
        type: String,
        required: 'Required id_user'
    },
    lastname: {
        type: String,
        required: 'Required lastname'
    },
    firstname: {
        type: String,
        required: 'Required firstname'
    },
    birthday: {
        type: Date,
        required: 'Required birthday'
    },
    description: {
        type: String,
        required: 'Required description'
    },
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
});

module.exports = mongoose.model('Patient', PatientSchema);


