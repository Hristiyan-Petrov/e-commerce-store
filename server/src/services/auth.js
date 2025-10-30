const { AppDataSource } = require("../db/data-source");
const User = require("../entities/User");
const userRepo = AppDataSource.getRepository(User);
const jwt = require('jsonwebtoken');


module.exports = {
    generateToken: (user) =>
        jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        ),

    verifyToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    },

    getUserById: async (id) => {
        const user = await userRepo.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'picture', 'phoneNumber']
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    },

    findOrCreateGoogleUser: async (profile) => {
        // Scenario 1
        let user = await userRepository.findOneBy({
            googleId: profile.id
        });

        if (user) {
            return user;
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
            return existingEmailUser;
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
        return newUser;
    },
} 
