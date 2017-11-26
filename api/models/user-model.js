'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

let UserSchema = new Schema({
    username: {
        type: String
    },
    lastname: {
        type: String
    },
    firstname: {
        type: String
    },
    mail: {
        type: String,
        lowercase: true,
        unique: true,
        required: 'Required mail'
    },
    password: {
        type: String,
        required: 'Required password'
    },
    setting: {
        durations: [{
            type: Number
        }],
        rates: [{
            type: Number
        }]
    },
    role: {
        type: String,
        enum: ['Client', 'Admin'],
        default: 'Client'
    },
    patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
});

// Saves the user's password hashed
UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.password, salt);

        this.password = hash;
        next();
    } else {
        next();
    }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password,  (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);


