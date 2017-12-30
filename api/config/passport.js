//@Flow
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../models/user.model';
import config from './main';

module.exports = (passport: any): void => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };
    passport.use(new Strategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, user) => {
            if (err) {
                done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};