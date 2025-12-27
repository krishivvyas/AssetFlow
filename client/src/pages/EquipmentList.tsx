import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
// import api from '../api/axios';

interface Equipment {
    id: number;
    name: string;
    serialNumber: string;
    department: string;
    status: 'ACTIVE' | 'MAINTENANCE' | 'SCRAP';
    location: string;
}

const EquipmentList = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);

    useEffect(() => {
        // Mock data for now until backend is reachable
        setEquipment([
            { id: 1, name: 'CNC Machine', serialNumber: 'CNC-001', department: 'Production', status: 'ACTIVE', location: 'Floor 1' },
            { id: 2, name: 'Forklift', serialNumber: 'FL-202', department: 'Logistics', status: 'MAINTENANCE', location: 'Warehouse' },
            { id: 3, name: 'Drill Press', serialNumber: 'DP-055', department: 'Workshop', status: 'ACTIVE', location: 'Floor 2' },
        ]);

        // Uncomment when backend is ready
        // api.get('/equipment').then(res => setEquipment(res.data)).catch(err => console.error(err));
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'success';
            case 'MAINTENANCE': return 'warning';
            case 'SCRAP': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">Equipment Registry</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>Add Equipment</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Serial #</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {equipment.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                                </TableCell>
                                <TableCell>{item.serialNumber}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>
                                    <Chip label={item.status} color={getStatusColor(item.status) as any} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Button size="small">View</Button>
                                    <Button size="small" color="secondary">History</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EquipmentList;
