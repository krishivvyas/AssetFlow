import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { Box, Typography, Paper, Card, CardContent, Chip, Avatar, IconButton, Stack, Button } from '@mui/material';
import { MoreVert as MoreIcon, Add as AddIcon, Engineering as TechIcon, AccessTime as TimeIcon } from '@mui/icons-material';

interface Request {
    id: string;
    subject: string;
    status: 'NEW' | 'IN_PROGRESS' | 'REPAIRED' | 'SCRAP';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    equipment: string;
    assignee?: string;
    dueto?: string;
}

const initialData: Request[] = [
    { id: '101', subject: 'Oil Leakage Fix', status: 'NEW', priority: 'HIGH', equipment: 'Forklift FL-202', assignee: 'JD', dueto: 'Today' },
    { id: '102', subject: 'Calibration Check', status: 'IN_PROGRESS', priority: 'MEDIUM', equipment: 'CNC Machine 01', assignee: 'MK', dueto: 'Tomorrow' },
    { id: '103', subject: 'Belt Replacement', status: 'REPAIRED', priority: 'LOW', equipment: 'Conveyor 3', assignee: 'JD', dueto: 'Yesterday' },
    { id: '104', subject: 'Motor Noise', status: 'NEW', priority: 'MEDIUM', equipment: 'Drill Press', dueto: 'Dec 30' },
];

const columns = {
    NEW: { title: 'New Requests', color: '#3b82f6' },
    IN_PROGRESS: { title: 'In Progress', color: '#eab308' },
    REPAIRED: { title: 'Completed', color: '#22c55e' },
    SCRAP: { title: 'Scrap / Archive', color: '#ef4444' }
};

const RequestsKanban = () => {
    const [requests, setRequests] = useState<Request[]>(initialData);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        // If simple reorder in same list (simplified for now, just updating status)
        if (source.droppableId !== destination.droppableId) {
            const newRequests = Array.from(requests);
            const movedItem = newRequests.find(r => r.id === result.draggableId);
            if (movedItem) {
                movedItem.status = destination.droppableId as any;
                setRequests([...newRequests]);
            }
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'error';
            case 'MEDIUM': return 'warning';
            case 'LOW': return 'success';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">Maintenance Board</Typography>
                    <Typography variant="body2" color="text.secondary">Manage and track maintenance requests</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>New Request</Button>
            </Stack>

            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, flexGrow: 1 }}>
                    {Object.entries(columns).map(([columnId, colDef]) => (
                        <Box key={columnId} sx={{ minWidth: 300, width: 300, display: 'flex', flexDirection: 'column' }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: '#f4f5f7',
                                    borderRadius: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colDef.color }} />
                                        <Typography variant="subtitle1" fontWeight="bold">{colDef.title}</Typography>
                                        <Chip size="small" label={requests.filter(r => r.status === columnId).length} sx={{ height: 20, fontSize: '0.75rem' }} />
                                    </Stack>
                                    <IconButton size="small"><MoreIcon /></IconButton>
                                </Box>

                                <Droppable droppableId={columnId}>
                                    {(provided) => (
                                        <Box
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            sx={{ flexGrow: 1, minHeight: 100 }}
                                        >
                                            {requests.filter(r => r.status === columnId).map((req, index) => (
                                                <Draggable key={req.id} draggableId={req.id} index={index}>
                                                    {(provided) => (
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            sx={{ mb: 2, boxShadow: 1, '&:hover': { boxShadow: 3 }, transition: 'box-shadow 0.2s' }}
                                                        >
                                                            <CardContent sx={{ p: '16px !important' }}>
                                                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                                                    <Chip
                                                                        label={req.priority}
                                                                        size="small"
                                                                        color={getPriorityColor(req.priority) as any}
                                                                        sx={{ borderRadius: 1, height: 24, fontSize: '0.7rem', fontWeight: 'bold' }}
                                                                    />
                                                                    {req.assignee && (
                                                                        <Avatar sx={{ width: 20, height: 20, fontSize: '0.8rem', bgcolor: 'primary.main' }}>{req.assignee}</Avatar>
                                                                    )}
                                                                </Stack>
                                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                                                                    {req.subject}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 0.2 }}>
                                                                    <TechIcon fontSize="inherit" /> {req.equipment}
                                                                </Typography>

                                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                        <TimeIcon fontSize="inherit" /> {req.dueto || 'No Date'}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.disabled">#{req.id}</Typography>
                                                                </Stack>
                                                            </CardContent>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </Paper>
                        </Box>
                    ))}
                </Box>
            </DragDropContext>
        </Box>
    );
};

export default RequestsKanban;
