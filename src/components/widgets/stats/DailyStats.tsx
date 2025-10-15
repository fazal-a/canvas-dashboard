import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { WidgetContainer } from '../WidgetContainer';
import { Widget } from '../../../types';
import { mockDailyStats } from '../../../data/mockData';

interface DailyStatsProps {
    widget: Widget;
}

export const DailyStats: React.FC<DailyStatsProps> = ({ widget }) => {
    const stats = [
        {
            label: 'Scheduled',
            value: mockDailyStats.scheduled,
            change: '+12%',
            color: '#00d4aa'
        },
        {
            label: 'Completed',
            value: mockDailyStats.completed,
            change: 'In Progress',
            color: '#0066ff'
        },
        {
            label: 'In Office',
            value: mockDailyStats.inOffice,
            change: 'Now',
            color: '#ffaa00'
        },
        {
            label: 'No Show',
            value: mockDailyStats.noShow,
            change: 'Today',
            color: '#ff4444'
        },
    ];

    return (
        <WidgetContainer widget={widget}>
            <Grid container spacing={2}>
                {stats.map((stat) => (
                    <Grid item xs={6} key={stat.label}>
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 2,
                                p: 2,
                                height: '100%',
                            }}
                        >
                            <Typography variant="caption" color="text.secondary">
                                {stat.label}
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                sx={{ my: 1, color: stat.color }}
                            >
                                {stat.value}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                <TrendingUpIcon sx={{ fontSize: 14 }} />
                                {stat.change}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </WidgetContainer>
    );
};
