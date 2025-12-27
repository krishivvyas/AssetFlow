import { Box, Grid, Paper, Typography, Card, CardContent, Button } from '@mui/material';
import {
    Build as EquipmentIcon,
    Warning as AlertIcon,
    CheckCircle as CheckIcon
} from '@mui/icons-material';

const SummaryCard = ({ title, value, icon, color }: { title: string, value: string, icon: any, color: string }) => (
    <Card sx={{ height: '100%', boxShadow: 2 }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${color}.light`,
                    color: `${color}.main`,
                    mr: 2,
                    display: 'flex'
                }}>
                    {icon}
                </Box>
                <Typography variant="h6" color="text.secondary">{title}</Typography>
            </Box>
            <Typography variant="h3" fontWeight="bold">{value}</Typography>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Dashboard Overview</Typography>
                <Button variant="contained" startIcon={<AlertIcon />} size="large">Report Issue</Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <SummaryCard title="Total Assets" value="124" icon={<EquipmentIcon />} color="primary" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <SummaryCard title="Open Requests" value="8" icon={<AlertIcon />} color="error" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <SummaryCard title="In Maintenance" value="3" icon={<BuildIconWrapper />} color="warning" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <SummaryCard title="Avg. Uptime" value="98.5%" icon={<CheckIcon />} color="success" />
                </Grid>
            </Grid>

            {/* Recent Activity Section */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 4, height: '100%', boxShadow: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>Recent Activity</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {[1, 2, 3].map((i) => (
                                <Box key={i} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Maintenance Completed: CNC Machine {i}</Typography>
                                    <Typography variant="body2" color="text.secondary">Technician John Doe replaced the hydraulic filter.</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 4, height: '100%', boxShadow: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>Quick Stats</Typography>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="body1" color="text.secondary">Preventive Tasks Due</Typography>
                            <Typography variant="h3" fontWeight="500">12</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">Critical Alerts</Typography>
                            <Typography variant="h3" color="error.main" fontWeight="500">2</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

// Helper for icon
const BuildIconWrapper = () => <EquipmentIcon />;

export default Dashboard;
