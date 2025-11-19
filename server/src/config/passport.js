require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github2');
const authService = require('../services/auth');
const { OAUTH_PROVIDERS } = require('../utils/constants');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const normalizedProfile = {
                    providerId: profile.id,
                    email: profile.emails?.[0]?.value,
                    name: profile.displayName,
                    picture: profile.photos?.[0]?.value,
                };

                if (!normalizedProfile.email) {
                    return done(new Error("Email not provided by the authentication provider."), null);
                }

                const user = await authService.findOrCreateOauthUser(OAUTH_PROVIDERS.GOOGLE, normalizedProfile);
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
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
        async (accessToken, refreshToken, profile, done) => {
            try {
                const normalizedProfile = {
                    providerId: profile.id,
                    email: profile.emails?.find(e => e.primary)?.value || profile.emails?.[0]?.value,
                    name: profile.displayName,
                    picture: profile.photos?.[0]?.value,
                };

                if (!normalizedProfile.email) {
                    return done(new Error("Email not provided by the authentication provider."), null);
                }

                const user = await authService.findOrCreateOauthUser(OAUTH_PROVIDERS.GITHUB, normalizedProfile);
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

module.exports = passport;