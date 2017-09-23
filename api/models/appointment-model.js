'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    id_patient: {
        type: String,
        required: 'Required id_patient'
    },
    id_user: {
        type: String,
        required: 'Required id_user'
    },
    date: {
        type: Date,
        required: 'Required date'
    },
    description: {
        type: String,
        required: 'Required description'
    },
    rate: {
        type: Number,
        required: 'Required rate'
    },
    duration: {
        type: Number,
        required: 'Required duration'
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);


