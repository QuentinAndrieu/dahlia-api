'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let PatientSchema = new Schema({
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
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    trash: {
        type: String,
        default: false
    }
});

PatientSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

module.exports = mongoose.model('Patient', PatientSchema);


