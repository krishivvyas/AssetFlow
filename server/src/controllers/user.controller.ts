import { Request, Response } from 'express';
import { prisma } from '../index';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../middleware/auth.middleware';

export const createUser = async (req: AuthRequest, res: Response) => {
    const { email, password, name, role, teamId } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
                teamId: teamId ? Number(teamId) : null
            }
        });
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, team: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
