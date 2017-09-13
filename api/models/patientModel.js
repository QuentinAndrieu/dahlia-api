'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    lastname: {
        type: String,
        required: 'Required '
    },
    firstname: {
        type: String,
        required: 'Required'
    },
    birthday: {
        type: Date,
        required: 'Required'
    },
    description: {
        type: String,
        required: 'Required'
    },
    appointements: [{
        date: {
            type: Date,
            required: 'Required'
        },
        description: {
            type: String,
            required: 'Required'
        },
        rate: {
            type: Number,
            required: 'Required'
        },
        duration: {
            type: Number,
            required: 'Required'
        }
    }]
});

module.exports = mongoose.model('Patients', PatientSchema);


