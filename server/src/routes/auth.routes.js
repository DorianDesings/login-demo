import { Router } from 'express';
import { login, register, verifyToken } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post('/auth/login', login);
authRoutes.post('/auth/register', register);
authRoutes.get('/auth/verifyToken', verifyToken);

export default authRoutes;
