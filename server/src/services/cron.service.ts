import cron from 'node-cron';
import { prisma } from '../index';

export const initCronJobs = () => {
    // Check for preventive maintenance tasks every day at midnight
    cron.schedule('0 0 * * *', async () => {
        console.log('Running daily preventive maintenance check...');

        try {
            const today = new Date();
            // Find requests scheduled for today that are preventive and still new
            const preventiveTasks = await prisma.maintenanceRequest.findMany({
                where: {
                    type: 'PREVENTIVE',
                    status: 'NEW',
                    scheduledDate: {
                        lte: today
                    }
                }
            });

            // Logic to notify technicians (could strictly be handling notifications here)
            // For now, we just log.
            console.log(`Found ${preventiveTasks.length} preventive tasks due.`);

            // Example: Auto-move to IN_PROGRESS if we wanted, or just send alerts.

        } catch (error) {
            console.error('Error in cron job:', error);
        }
    });
};
