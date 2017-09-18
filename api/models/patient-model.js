'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
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
    appointments: [{
        id: {
            type: String,
            required: 'Required id'
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
    }]
});

module.exports = mongoose.model('Patients', PatientSchema);


