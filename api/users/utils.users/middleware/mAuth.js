import jwt from 'jsonwebtoken';

export const authorizeUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
        const decodedToken = jwt.verify(token, 'secretKey');
        req.user = decodedToken; // Attach the user info to the request

        // Check if the user is the same user who created the target user or an admin
        if (decodedToken.id === req.params.userId || decodedToken.isAdmin) {
            return next();
        }

        // Access denied
        return res.status(403).json({ message: 'Access denied.' });
    } catch (error) {
        res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
        const decodedToken = jwt.verify(token, 'secretKey');
        req.user = decodedToken; // Attach the user info to the request

        // Check if the user is an admin
        if (decodedToken.isAdmin) {
            return next();
        }

        // Access denied
        return res.status(403).json({ message: 'Access denied. Admin access required.' });
    } catch (error) {
        res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
};

export default {
    authorizeAdmin, authorizeUser
}