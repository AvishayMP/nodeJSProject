import userService from '../services.users/usersServices.js';

const register = async (req, res) => {
    try {
        const newUser = await userService.registerUser(req.body);
        res.status(201).json({ message: 'registered successfully', body: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        res.status(200).json({ message: 'successfully signed!', token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export default {
    register,
    login
}