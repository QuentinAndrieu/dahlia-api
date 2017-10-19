let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../api/models/user-model'),
    config = require('../config/main');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        const jwt_user_id = jwt_payload.sub;
        User.findOne({ mail: jwt_payload.mail }, function (err, user) {
            console.log('user', user);
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};