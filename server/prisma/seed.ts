import { PrismaClient, Role, Status } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Maintenance Team
    const maintenanceTeam = await prisma.maintenanceTeam.upsert({
        where: { name: 'General Maintenance' },
        update: {},
        create: {
            name: 'General Maintenance',
        },
    });

    console.log({ maintenanceTeam });

    // Create Manager
    const manager = await prisma.user.upsert({
        where: { email: 'manager@assetflow.com' },
        update: {},
        create: {
            email: 'manager@assetflow.com',
            name: 'Manager User',
            password: hashedPassword,
            role: Role.MANAGER,
        },
    });

    console.log({ manager });

    // Create Technician
    const technician = await prisma.user.upsert({
        where: { email: 'tech@assetflow.com' },
        update: {},
        create: {
            email: 'tech@assetflow.com',
            name: 'Technician User',
            password: hashedPassword,
            role: Role.TECHNICIAN,
            teamId: maintenanceTeam.id,
        },
    });

    console.log({ technician });

    // Create Employee
    const employee = await prisma.user.upsert({
        where: { email: 'employee@assetflow.com' },
        update: {},
        create: {
            email: 'employee@assetflow.com',
            name: 'Employee User',
            password: hashedPassword,
            role: Role.EMPLOYEE,
        },
    });

    console.log({ employee });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
