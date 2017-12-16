'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    winston = require('winston');

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
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    trash: {
        type: String,
        default: false
    }
});

// Saves the user's password hashed
UserSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

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
UserSchema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
        winston.error('COMPARE_PASSWORD', password);
        if (password) {
            bcrypt.compare(password, this.password, (err, isMatch) => {
                if (err) {
                    winston.error('COMPARE_PASSWORD_REJECTED');
                    reject(err);
                } else if (isMatch) {
                    winston.error('COMPARE_PASSWORD_FULLFILED', 'Password matched');
                    resolve();
                } else {
                    winston.error('COMPARE_PASSWORD_REJECTED', 'Password doesn\'t matched');
                    reject('Password doesn\'t matched');
                }
            });
        } else {
            winston.error('COMPARE_PASSWORD_REJECTED', 'Empty password');
            reject('Empty password');
        }

    });
};


module.exports = mongoose.model('User', UserSchema);