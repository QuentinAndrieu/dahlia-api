//@Flow
import mongoose from 'mongoose';
import winston from 'winston';
import config from '../config/main';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

let User = mongoose.model('User');

exports.register = (user: IUser, role: string): Promise<IUser> => {
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

exports.authenticate = (mail: string, password: string): Promise<string> => {
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
                reject('Authentication failed. User not fund');
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
                    resolve('Bearer ' + token);
                }).catch((err) => {
                    winston.error('AUTHENTICATE_REJECTED', err);
                    reject(err);
                })
            }
        });
    });
}