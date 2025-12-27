import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { createUser } from '../controllers/user.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
// Registration might be restricted to managers or require no auth for initial setup. 
// For now, let's allow managers to create users via /users, but maybe a public register for demo?
// Sticking to requirement: "Role checks for managers vs technicians vs employees" -> implies admin creates users usually.
// But we might need a way to seed or create the first user. 
// Exposing a public register endpoint for now for simplicity, or we can use the User controller.

export default router;
