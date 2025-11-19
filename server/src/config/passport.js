require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github2');
const authService = require('../services/auth');
const { OAUTH_PROVIDERS } = require('../utils/constants');

const normalizeProfile = (provider, profile) => {
    let email;

    if (provider === OAUTH_PROVIDERS.GOOGLE) {
        email = profile.emails?.[0]?.value;
    } else if (provider === OAUTH_PROVIDERS.GITHUB) {
        email = profile.emails?.find(e => e.primary)?.value || profile.emails?.[0]?.value;
    }

    return {
        providerId: profile.id,
        email,
        name: profile.displayName,
        picture: profile.photos?.[0]?.value,
    };
};

const createStrategyCallback = (provider) => {
    return async (accessToken, refreshToken, profile, done) => {
        try {
            const normalizedProfile = normalizeProfile(provider, profile);

            if (!normalizedProfile.email) {
                return done(new Error(`Email not provided by the ${provider}.`), null);
            }

            const user = await authService.findOrCreateOauthUser(provider, normalizedProfile);
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
};

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        createStrategyCallback(OAUTH_PROVIDERS.GOOGLE)
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_OAUTH2_CLIENT_ID,
            clientSecret: process.env.GITHUB_OAUTH2_CLIENT_SECRET,
            callbackURL: '/api/auth/github/callback',
            scope: ['user:email']
        },
        createStrategyCallback(OAUTH_PROVIDERS.GITHUB)
    )
);

module.exports = passport;