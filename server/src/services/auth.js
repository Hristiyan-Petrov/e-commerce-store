const { AppDataSource } = require("../db/data-source");
const User = require("../entities/User");
const UserConnection = require("../entities/UserConnection");
const userRepo = AppDataSource.getRepository(User);
const userConnectionRepo = AppDataSource.getRepository(UserConnection);
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
            select: ['id', 'email', 'name', 'picture', 'phoneNumber', 'role', 'status']
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    },

    findOrCreateOauthUser: async (provider, normalizedProfile) => {
        return AppDataSource.transaction(async (transactionalEntityManager) => {
            const userRepo = transactionalEntityManager.getRepository(User);
            const userConnectionRepo = transactionalEntityManager.getRepository(UserConnection);

            const {providerId, email, name, picture} = normalizedProfile;

            // Scenario 1: User has signed in with this provider before.
            let connection = await userConnectionRepo.findOne({
                where: {
                    provider,
                    providerId
                },
                relations: ['user']
            });

            if (connection) {
                return connection.user;
            }

            // Scenario 2: Does a user with this email have already registered 
            const user = await userRepo.findOneBy({ email });

            if (user) {
                // Link this new connection to the existing user
                const newConnection = userConnectionRepo.create({
                    provider,
                    providerId,
                    userId: user.id
                })
                await userConnectionRepo.save(newConnection);

                if (!user.picture && picture) {
                    user.picture = picture;
                    await userRepo.save(user);
                }

                return user;
            }

            // Scenario 3: First time seeing this user
            const newUser = userRepo.create({
                email,
                name,
                picture,
            });
            await userRepo.save(newUser);
            
            const newConnection = userConnectionRepo.create({
                provider,
                providerId,
                userId: newUser.id
            });
            await userConnectionRepo.save(newConnection);
            return newUser;
        });
    },
} 
