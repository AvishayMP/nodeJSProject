import fs from 'fs';
import path from 'path';

const dirName = import.meta.url;
const USERS_JSON_PATH = path.join(dirName + '../../../data/users.json');

const getUsersFromFile = async () => {
    try {
        const content = fs.readFileSync(USERS_JSON_PATH, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        return [];
    }
}

const saveUsersToFile = async (users) => {
    fs.writeFileSync(USERS_JSON_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

// exported methods:
const getAllUsers = async () => {
    const users = await getUsersFromFile();
    return users;
}
const getUserById = async (userId) => {
    const users = await getUsersFromFile();
    return users.find(u => u.id === userId);
}

const createUser = async (userData) => {
    const users = await getUsersFromFile();
    if (!users.find(u => u.email == userData.email)) {
        users.push(userData);
        saveUsersToFile(users);
        return userData;
    } else {
        throw new Error('User exist');
    }
}

const updateUser = async (userId, updatedUserData) => {
    const users = await getUsersFromFile();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found.');
    }
    users[userIndex] = { ...users[userIndex], ...updatedUserData };
    await saveUsersToFile(users);
    return users[userIndex];
}

const deleteUser = async (userId) => {
    const users = await getUsersFromFile();
    const userIndex = users.findIndex(u => u.id === userId);
    console.log(userIndex);
    if (userIndex === -1) {
        throw new Error('User not found.');
    }
    const deletedUser = users.splice(userIndex, 1);
    console.log(deletedUser);
    await saveUsersToFile(users);
    return deletedUser;
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}