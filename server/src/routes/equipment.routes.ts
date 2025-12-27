import { Router } from 'express';
import { getAllEquipment, getEquipmentById, createEquipment, updateEquipment, deleteEquipment } from '../controllers/equipment.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllEquipment);
router.get('/:id', authenticateToken, getEquipmentById);
router.post('/', authenticateToken, authorizeRole(['MANAGER', 'TECHNICIAN']), createEquipment);
router.put('/:id', authenticateToken, authorizeRole(['MANAGER', 'TECHNICIAN']), updateEquipment);
router.delete('/:id', authenticateToken, authorizeRole(['MANAGER']), deleteEquipment);

export default router;
