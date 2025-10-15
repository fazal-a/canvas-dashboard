import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { AccessTime as TimeIcon } from '@mui/icons-material';
import { WidgetContainer } from '../WidgetContainer';
import { Widget } from '../../../types';
import { mockAppointments } from '../../../data/mockData';

interface TodaysScheduleProps {
    widget: Widget;
}

export const TodaysSchedule: React.FC<TodaysScheduleProps> = ({ widget }) => {
    return (
        <WidgetContainer widget={widget}>
            <Stack spacing={1.5}>
                {mockAppointments.map((appointment) => (
                    <Box
                        key={appointment.id}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderLeft: '3px solid',
                            borderLeftColor: 'primary.main',
                            borderRadius: 1,
                            p: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                transform: 'translateX(4px)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <TimeIcon sx={{ fontSize: 14, color: 'primary.main' }} />
                            <Typography
                                variant="caption"
                                sx={{ color: 'primary.main', fontWeight: 600 }}
                            >
                                {appointment.startTime} - {appointment.endTime}
                            </Typography>
                            <Chip
                                label={appointment.status}
                                size="small"
                                sx={{
                                    ml: 'auto',
                                    height: 20,
                                    fontSize: '0.7rem',
                                    backgroundColor: 'rgba(0, 212, 170, 0.2)',
                                }}
                            />
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                            {appointment.patientName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {appointment.type} • {appointment.location}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            DOB: {appointment.dateOfBirth} ({appointment.age} y/o {appointment.gender})
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </WidgetContainer>
    );
};
