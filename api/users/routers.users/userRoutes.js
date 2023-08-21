import express from 'express';

const router = express.Router();

import userController from '../controllers.users/usersController.js';
import { authorizeUser, authorizeAdmin } from '../utils.users/middleware/mAuth.js';

// Apply authorization middleware to protect these routes
router.get('/', authorizeAdmin, userController.getAllUsers)
router.get('/:id', authorizeUser, userController.getUser);
router.put('/:id', authorizeUser, userController.updateUser);
router.delete('/:id', authorizeUser, userController.deleteUser);

export default router;