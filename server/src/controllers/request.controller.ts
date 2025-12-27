import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const requests = await prisma.maintenanceRequest.findMany({
            include: { equipment: true, technician: true, createdByUser: true }
        });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
};

export const createRequest = async (req: AuthRequest, res: Response) => {
    const { subject, description, type, priority, equipmentId, scheduledDate, duration, technicianId } = req.body;

    if (!req.user) return res.sendStatus(401);

    try {
        const request = await prisma.maintenanceRequest.create({
            data: {
                subject,
                description,
                type,
                priority,
                equipmentId: Number(equipmentId),
                createdByUserId: req.user.id,
                scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
                duration: duration ? Number(duration) : null,
                technicianId: technicianId ? Number(technicianId) : null,
                status: 'NEW'
            }
        });
        // TODO: Update Equipment status if needed
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create request', details: error });
    }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const request = await prisma.maintenanceRequest.update({
            where: { id: Number(id) },
            data: { status }
        });

        // Smart feature: If status is SCRAP, update equipment status
        if (status === 'SCRAP') {
            await prisma.equipment.update({
                where: { id: request.equipmentId },
                data: { status: 'SCRAP' }
            });
        }

        res.json(request);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update request' });
    }
};
