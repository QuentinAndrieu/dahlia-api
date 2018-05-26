//@Flow
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import winston from 'winston';

let Schema = mongoose.Schema;

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
    defaultRate:{
        type: Number,
        required: 'Required default rate',
        default: 60
    },
    defaultDuration:{
        type: Number,
        required: 'Required default duration',
        default: 30
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
        type: Boolean,
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