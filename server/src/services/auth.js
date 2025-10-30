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
    
} 
