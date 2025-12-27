import { Router } from 'express';
import { getAllRequests, createRequest, updateRequestStatus } from '../controllers/request.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllRequests);
router.post('/', authenticateToken, createRequest);
router.patch('/:id/status', authenticateToken, updateRequestStatus);

export default router;
