import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Box } from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { Widget } from '../../types';
import { useDashboardStore } from '../../store/dashboardStore';

interface WidgetContainerProps {
    widget: Widget;
    children: React.ReactNode;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
                                                                    widget,
                                                                    children,
                                                                }) => {
    const isEditMode = useDashboardStore((state) => state.isEditMode);
    const removeWidget = useDashboardStore((state) => state.removeWidget);

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(`Remove "${widget.title}" widget?`)) {
            removeWidget(widget.i);
        }
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: isEditMode ? '2px dashed' : '1px solid',
                borderColor: isEditMode ? 'primary.main' : 'divider',
                backgroundColor: isEditMode
                    ? 'rgba(0, 212, 170, 0.05)'
                    : 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s',
                cursor: isEditMode ? 'move' : 'default',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: isEditMode ? 'primary.main' : 'rgba(0, 212, 170, 0.5)',
                    transform: isEditMode ? 'none' : 'translateY(-2px)',
                },
            }}
        >
            <CardHeader
                title={widget.title}
                action={
                    <Box>
                        {isEditMode && (
                            <IconButton size="small" onClick={handleRemove} color="error">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                        <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Box>
                }
                sx={{
                    '& .MuiCardHeader-title': {
                        fontSize: '1rem',
                        fontWeight: 600,
                    },
                    pb: 1,
                }}
            />
            <CardContent sx={{ flexGrow: 1, pt: 0, overflow: 'auto' }}>
                {children}
            </CardContent>
        </Card>
    );
};
