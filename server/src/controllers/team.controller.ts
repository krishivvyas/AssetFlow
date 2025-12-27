import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await prisma.maintenanceTeam.findMany({
            include: { members: true }
        });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};

export const createTeam = async (req: AuthRequest, res: Response) => {
    const { name, memberIds } = req.body;
    try {
        const team = await prisma.maintenanceTeam.create({
            data: {
                name,
                members: {
                    connect: memberIds?.map((id: number) => ({ id })) || []
                }
            },
            include: { members: true }
        });
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
};
