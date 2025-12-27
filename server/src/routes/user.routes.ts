import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/user.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['MANAGER']), getAllUsers);
router.post('/', authenticateToken, authorizeRole(['MANAGER']), createUser);

export default router;
