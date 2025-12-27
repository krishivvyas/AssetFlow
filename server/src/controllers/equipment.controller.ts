import type { Request, Response } from 'express';
import { prisma } from '../index';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getAllEquipment = async (req: Request, res: Response) => {
    try {
        const equipment = await prisma.equipment.findMany({
            include: { team: true }
        });
        res.json(equipment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch equipment' });
    }
};

export const getEquipmentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const equipment = await prisma.equipment.findUnique({
            where: { id: Number(id) },
            include: { team: true, requests: true }
        });
        if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
        res.json(equipment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch equipment' });
    }
};

export const createEquipment = async (req: AuthRequest, res: Response) => {
    const { name, serialNumber, department, location, purchaseDate, warrantyExpiry, teamId } = req.body;
    try {
        const equipment = await prisma.equipment.create({
            data: {
                name,
                serialNumber,
                department,
                location,
                purchaseDate: new Date(purchaseDate),
                warrantyExpiry: warrantyExpiry ? new Date(warrantyExpiry) : null,
                teamId: teamId ? Number(teamId) : null
            }
        });
        res.status(201).json(equipment);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create equipment', details: error });
    }
};

export const updateEquipment = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    // Format dates if present
    if (data.purchaseDate) data.purchaseDate = new Date(data.purchaseDate);
    if (data.warrantyExpiry) data.warrantyExpiry = new Date(data.warrantyExpiry);

    try {
        const equipment = await prisma.equipment.update({
            where: { id: Number(id) },
            data
        });
        res.json(equipment);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update equipment' });
    }
};

export const deleteEquipment = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.equipment.delete({ where: { id: Number(id) } });
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete equipment' });
    }
};
