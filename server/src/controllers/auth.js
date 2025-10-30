const authService = require('../services/auth');

function setTokenCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // CSRF protection,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

const handleGoogleCallback = (req, res) => {
    console.log('SUCCESSFULL GOOGLE LOGIN');
    console.log(req.user);

    // req.user contains the user object from passport strategy
    const token = authService.generateToken(req.user);
    setTokenCookie(res, token);

    // Redirect to frontend homepage 
    res.redirect(`${process.env.CLIENT_URL}/`);
};

const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const decoded = authService.verifyToken(token);
        const user = await authService.getUserById(decoded.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });

    } catch (error) {
        console.error('Get current user error:', error);

        if (error.message === 'Invalid or expired token' ||
            error.message === 'User not found') {
            return res.status(401).json({ error: 'Invalid authentication' });
        }

        res.status(500).json({ error: 'Failed to get user' });
    }
};

module.exports = {
    handleGoogleCallback,
    getCurrentUser,

};