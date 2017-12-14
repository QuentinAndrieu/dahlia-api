'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main'),
    winston = require('winston');

exports.register = (user, role) => {
    return new Promise((resolve, reject) => {
        winston.info('REGISTER');

        if (!user.mail || !user.password) {
            winston.error('REGISTER_REJECTED', 'Missing mail or password');
            reject('Please enter mail and password.');
        } else {
            let new_user = new User(user);
            new_user.role = role;

            // Attempt to save the user
            new_user.save((err, user) => {
                if (err) {
                    winston.error('REGISTER_REJECTED', err);
                    reject(err);
                } else {
                    winston.info('REGISTER_FULLFILED');
                    resolve(user);
                }
            });
        }
    });
}

exports.authenticate = (mail, password) => {
    return new Promise((resolve, reject) => {
        winston.info('AUTHENTICATE');

        User.findOne({
            mail: mail
        }, (err, user) => {
            if (err) {
                winston.error('AUTHENTICATE_REJECTED', err);
                reject(err);
            } else if (!user) {
                winston.error('AUTHENTICATE_REJECTED', 'User not found.');
                reject('Authentification failed. User not fund');
            } else {
                user.comparePassword(password).then(() => {
                    let token = jwt.sign({
                        id: user._id,
                        mail: user.mail,
                        password: user.password,
                        role: user.role
                    }, config.secret, {
                        expiresIn: 10080 // in seconds
                    });

                    winston.info('AUTHENTICATE_FULLFILED');
                    resolve({
                        token: 'Bearer ' + token
                    });
                }).catch((err) => {
                    winston.error('AUTHENTICATE_REJECTED', err);
                    reject(err);
                })
            }
        });
    });
}