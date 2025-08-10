const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope:["profile","email"]
}, 
async (accessToken, refreshToken, profile, done) => {
    // console.log("profile", profile)
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return done(null, { user, token });
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

