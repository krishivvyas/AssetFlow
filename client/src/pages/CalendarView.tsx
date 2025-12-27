import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, List, ListItem, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const myEventsList = [
    {
        title: 'Preventive Check: CNC-001',
        start: new Date(2025, 11, 29, 10, 0),
        end: new Date(2025, 11, 29, 12, 0),
        type: 'PREVENTIVE'
    },
    {
        title: 'Oil Change: Generator',
        start: new Date(2025, 11, 30, 14, 0),
        end: new Date(2025, 11, 30, 15, 30),
        type: 'ROUTINE'
    },
    {
        title: 'Safety Inspection',
        start: new Date(2025, 11, 28, 9, 0),
        end: new Date(2025, 11, 28, 11, 0),
        type: 'AUDIT'
    }
];

const CalendarView = () => {
    const [view, setView] = useState<View>('month');
    const [date, setDate] = useState(new Date(2025, 11, 29));

    const onNavigate = (newDate: Date) => setDate(newDate);
    const onView = (newView: View) => setView(newView);

    const eventStyleGetter = (event: any) => {
        let backgroundColor = '#3174ad';
        if (event.type === 'PREVENTIVE') backgroundColor = '#eab308';
        if (event.type === 'AUDIT') backgroundColor = '#ef4444';
        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">Maintenance Schedule</Typography>
                    <Typography variant="body2" color="text.secondary">Plan and view upcoming maintenance activities</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>Schedule Task</Button>
            </Box>

            <Grid container spacing={3} sx={{ height: '100%' }}>
                <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2 }}>
                        {/* Custom Toolbar-like controls if needed, or rely on default */}
                        <Calendar
                            localizer={localizer}
                            events={myEventsList}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%', minHeight: 500 }}
                            eventPropGetter={eventStyleGetter}
                            view={view}
                            onView={onView}
                            date={date}
                            onNavigate={onNavigate}
                            views={['month', 'week', 'day', 'agenda']}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={3}>
                        <Card sx={{ boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Upcoming</Typography>
                                <List disablePadding>
                                    {myEventsList.map((evt, idx) => (
                                        <ListItem key={idx} disablePadding sx={{ mb: 2, display: 'block' }}>
                                            <Typography variant="subtitle2" fontWeight="bold">{evt.title}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {format(evt.start, 'MMM dd, HH:mm')} - {format(evt.end, 'HH:mm')}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>

                        <Card sx={{ boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Legend</Typography>
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#3174ad' }} />
                                        <Typography variant="body2">Routine</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#eab308' }} />
                                        <Typography variant="body2">Preventive</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
                                        <Typography variant="body2">Audit</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CalendarView;
