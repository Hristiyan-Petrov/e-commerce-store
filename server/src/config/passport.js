require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { AppDataSource } = require("../db/data-source");
const User = require('../entities/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userRepository = AppDataSource.getRepository(User);

                // Scenario 1
                let user = await userRepository.findOneBy({
                    googleId: profile.id
                });

                if (user) {
                    return done(null, user);
                }

                // Scenario 2
                // Check if email is already registered with email/password
                const existingEmailUser = await userRepository.findOneBy({
                    email: profile.emails[0].value,
                });

                if (existingEmailUser) {
                    // Link Google account to existing user
                    existingEmailUser.googleId = profile.id;
                    existingEmailUser.picture = profile.photos[0]?.value;
                    await userRepository.save(existingEmailUser);
                    return done(null, existingEmailUser);
                }

                // Scenario 3
                // Create new user
                const newUser = userRepository.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    picture: profile.photos[0]?.value,
                });

                await userRepository.save(newUser);
                return (null, newUser);

            } catch (error) {
                return done(error, null);
            }
        }
    )
);

module.exports = passport;