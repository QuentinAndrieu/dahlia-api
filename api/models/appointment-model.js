'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    id_patient: {
        type: String,
        required: 'Required Date'
    },
    date: {
        type: Date,
        required: 'Required Date'
    },
    description: {
        type: String,
        required: 'Required String'
    },
    rate: {
        type: Number,
        required: 'Required Number'
    },
    duration: {
        type: Number,
        required: 'Required Number'
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);


