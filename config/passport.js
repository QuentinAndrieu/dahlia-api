let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../api/models/user-model'),
    config = require('../config/main');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err)
                return done(err, false);

            if (user)
                done(null, user);
            else
                done(null, false);

        });
    }));
};