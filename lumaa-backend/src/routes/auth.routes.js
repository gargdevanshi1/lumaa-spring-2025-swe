import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

export default router;
