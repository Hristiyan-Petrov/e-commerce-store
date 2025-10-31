const express = require('express');
const passport = require('../config/passport');
const { handleGoogleCallback, getCurrentUser, logout } = require('../controllers/auth');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`
    }),
    handleGoogleCallback
);

router.get('/me', getCurrentUser);

router.get('/logout',
    // Protected,
    logout
);

module.exports = router;