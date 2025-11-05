import React from 'react';
import {Card, CardHeader, CardContent, IconButton, Box} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import {Widget} from '@/types';
import {useDashboardStore} from '@/store/dashboardStore';

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
                borderColor: isEditMode ? 'primary.main' : 'rgba(255, 255, 255, 0.06)',
                background: isEditMode
                    ? 'linear-gradient(145deg, rgba(0, 212, 138, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)'
                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: isEditMode ? 'grab' : 'default',
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 212, 138, 0.5), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                },
                '&:hover': {
                    borderColor: isEditMode ? 'primary.main' : 'rgba(0, 212, 138, 0.3)',
                    transform: isEditMode ? 'none' : 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 212, 138, 0.1)',
                    '&:before': {
                        opacity: 1,
                    },
                },
            }}
        >
            <CardHeader
                title={widget.title}
                action={
                    <Box sx={{display: 'flex', gap: 0.5}}>
                        {isEditMode && (
                            <IconButton
                                size="small"
                                color="error"
                                onMouseDown={(e) => {
                                    // Prevent drag from starting
                                    e.stopPropagation();
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (window.confirm(`Remove "${widget.title}" widget?`)) {
                                        removeWidget(widget.i);
                                    }
                                }}
                                sx={{
                                    zIndex: 1000,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                    }
                                }}
                            >
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        )}
                        <IconButton size="small">
                            <MoreVertIcon fontSize="small"/>
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
            <CardContent sx={{flexGrow: 1, pt: 0, overflow: 'auto'}}>
                {children}
            </CardContent>
        </Card>
    );
};
