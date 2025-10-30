const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');

const router = express.Router();

function generateToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

function setTokenCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // CSRF protection,
        maxAge: 7 * 24 * 60 *60 * 1000, // 7 days
    });
};

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`
    }),
    (req, res) => {
        console.log('SUCCESSFULL GOOGLE LOGIN');
        console.log(req.user);
        
        // req.user contains the user object from passport strategy
        const token = generateToken(req.user);
        setTokenCookie(res, token);

        // Redirect to frontend homepage 
        res.redirect(`${process.env.CLIENT_URL}/`);
    }
);

module.exports = router;