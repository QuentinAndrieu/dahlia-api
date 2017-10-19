'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main');

exports.register = function (req, res) {
    if (!req.body.mail || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter mail and password.'
        });
    } else {
        let new_user = new User(req.body);

        // Attempt to save the user
        new_user.save(function (err) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'That mail address already exists.'
                });
            }
            res.json({
                success: true,
                message: 'User successfully created'
            });
        });
    }
}

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
exports.authenticate = function (req, res) {
    User.findOne({
        mail: req.body.mail
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    let token = jwt.sign({
                        id: user._id,
                        mail: user.mail,
                        password: user.password
                    }, config.secret, {
                            expiresIn: 10080 // in seconds
                        });
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Passwords did not match.'
                    });
                }
            });
        }
    });
};