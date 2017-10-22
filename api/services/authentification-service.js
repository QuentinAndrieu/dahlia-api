'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main');

exports.register = function (req, res, role) {
    if (!req.body.mail || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter mail and password.'
        });
    } else {
        let new_user = new User(req.body);
        new_user.role = role;

        console.log('user', new_user);

        // Attempt to save the user
        new_user.save(function (err) {
            if (err) {
                return res.json({
                    success: false,
                    message: err
                });
            }
            res.json({
                success: true,
                message: role + ' successfully created'
            });
        });
    }
}


exports.authenticate = function(req, res){
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
                        password: user.password,
                        role: user.role
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
}