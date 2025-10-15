import React from 'react';
import {Box, Typography, Grid, Chip} from '@mui/material';
import {WidgetContainer} from '../WidgetContainer';
import {Widget} from '../../../types';
import {mockOutstandingItems} from '../../../data/mockData';

interface OutstandingItemsProps {
    widget: Widget;
}

export const OutstandingItems: React.FC<OutstandingItemsProps> = ({widget}) => {
    const items = [
        {
            label: 'Open Notes',
            value: mockOutstandingItems.openNotes,
            color: '#ff4444',
            icon: '📝'
        },
        {
            label: 'Pending Labs',
            value: mockOutstandingItems.pendingLabs,
            color: '#ffaa00',
            icon: '🧪'
        },
        {
            label: 'Messages',
            value: mockOutstandingItems.messages,
            color: '#00d4aa',
            icon: '💬'
        },
        {
            label: 'Recalls Due',
            value: mockOutstandingItems.recallsDue,
            color: '#0066ff',
            icon: '🔄'
        },
    ];

    return (
        <WidgetContainer widget={widget}>
            <Grid container spacing={2}>
                {items.map((item) => (
                    <Grid item xs={6} key={item.label}>
                        <Box sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            p: 2,
                            height: '100%',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                transform: 'scale(1.02)',
                            },
                        }}
                        >
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                <Typography variant="h6">{item.icon}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {item.label}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                sx={{color: item.color}}
                            >
                                {item.value}
                            </Typography>
                            {item.value > 50 && (
                                <Chip
                                    label="High"
                                    size="small"
                                    sx={{
                                        mt: 1,
                                        height: 20,
                                        fontSize: '0.7rem',
                                        backgroundColor: `${item.color}33`,
                                        color: item.color,
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </WidgetContainer>
    );
};
