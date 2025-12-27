import { Router } from 'express';
import { getAllTeams, createTeam } from '../controllers/team.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllTeams);
router.post('/', authenticateToken, authorizeRole(['MANAGER']), createTeam);

export default router;
