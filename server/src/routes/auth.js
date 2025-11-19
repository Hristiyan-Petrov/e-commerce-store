const express = require('express');
const passport = require('../config/passport');
const { getCurrentUser, logout, handleOAuthCallback } = require('../controllers/auth');

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
    handleOAuthCallback
);

router.get('/github', passport.authenticate('github', {
    scope: ['profile', 'user'],
    session: false
}));

router.get('/github/callback',
    passport.authenticate('github', {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`
    }),
    handleOAuthCallback
);

router.get('/me', getCurrentUser);

router.get('/logout',
    // Protected,
    logout
);

module.exports = router;