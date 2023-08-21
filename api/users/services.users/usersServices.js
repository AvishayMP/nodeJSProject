import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuvid4 } from 'uuid';

import usersDal from '../dal.users/usersDal.js';
import userSchemas from '../utils.users/schemes/schemes.js';

// Simulated in-memory user data
const registerUser = async (userData) => {
    const { error, value } = userSchemas.newUserSchema.validate(userData);
    if (error) {
        throw new Error('Validation error: ' + error.details.map(d => d.message).join(', '));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    // Store user data
    const newUser = { ...value, password: hashedPassword, id: uuvid4() };
    try {
        await usersDal.createUser(newUser);
        return newUser;
    } catch (err) {
        throw err;
    }
};

const loginUser = async (loginData) => {
    const user = await usersDal.getUserById(loginData.id);
    if (!user) {
        throw new Error('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password.');
    }

    // Generate JWT
    const token = jwt.sign({
        userId: user.id,
        isAdmin: user.isAdmin
    }, 'secretKey');

    return token;
};

const getAllUsers = async () => {
    try {
        const users = await usersDal.getAllUsers();
        return users;
    } catch (error) {
        throw new Error('Failed to fetch users.');
    }
}
const getUserById = async (userId) => {
    const user = usersDal.getUserById(userId);
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
};

const updateUser = async (userId, updatedUserData) => {
    const { error, value } = userSchemas.updateUserSchema.validate(updatedUserData);
    if (error) {
        throw new Error('invalid data types.');
    }
    const savedUser = await usersDal.updateUser(userId, value);
    return savedUser;
};

const deleteUser = async (userId) => {
    const deletedUser = await usersDal.deleteUser(userId);
    if (deletedUser) {
        throw new Error('User not found.');
    }
    return deletedUser;
};

export default {
    getAllUsers,
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
}