const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect(`http://localhost:4000/auth/success?token=${req.user.token}&name=${req.user.user.name}`);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
