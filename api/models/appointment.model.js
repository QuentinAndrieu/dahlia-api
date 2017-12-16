'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let AppointmentSchema = new Schema({
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
    title: {
        type: String,
        required: 'Required title'
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
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    trash: {
        type: String,
        default: false
    }
});

AppointmentSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);


