'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main'),
    winston = require('winston');

exports.register = (user, role, callback) => {
    winston.info('REGISTER');

    if (!user.mail || !user.password) {
        winston.error('REGISTER_REJECTED', 'Missing mail or password');
        if (callback)
            callback('Please enter mail and password.');
    } else {
        let new_user = new User(user);
        new_user.role = role;

        // Attempt to save the user
        new_user.save((err, user) => {
            if (err)
                winston.error('REGISTER_REJECTED', err);
            else
                winston.info('REGISTER_FULLFILED');

            if (callback)
                callback(err, user);
        });
    }
}

exports.authenticate = (mail, password, callback) => {
    winston.info('AUTHENTICATE');

    User.findOne({
        mail: mail
    }, (err, user) => {
        if (err) {
            winston.error('AUTHENTICATE_REJECTED', err);
            if (callback)
                callback(err);
        } else if (!user) {
            winston.error('AUTHENTICATE_REJECTED', 'User not found.');
            if (callback)
                callback('Authentification failed. User not fund');
        } else {
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    winston.error('AUTHENTICATE_REJECTED', err);
                    if (callback)
                        callback(err);
                }
                else if (isMatch) {
                    // Create token if the password matched and no error was thrown
                    let token = jwt.sign({
                        id: user._id,
                        mail: user.mail,
                        password: user.password,
                        role: user.role
                    }, config.secret, {
                            expiresIn: 10080 // in seconds
                        });

                    winston.info('AUTHENTICATE_FULLFILED');

                    if (callback)
                        callback(null, {
                            token: 'Bearer ' + token
                        });
                } else if (!isMatch) {
                    winston.error('AUTHENTICATE_REJECTED', 'Password does not match');
                    if (callback)
                        callback('Authentification failed. Password does not match');
                }
            });
        }
    });
}