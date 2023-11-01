import { Router } from 'express';
import { login, register } from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);

export default userRoutes;
