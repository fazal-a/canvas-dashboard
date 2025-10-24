import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    TextField,
    List,
    ListItemButton,
    Chip,
    Divider,
    InputAdornment,
    IconButton,
} from '@mui/material';
import {
    Search as SearchIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { useDashboardStore } from '@/store/dashboardStore';
import { widgetDefinitions } from '@/utils/widgetRegistry';
import { Widget } from '@/types';

export const WidgetLibrary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const isOpen = useDashboardStore((state) => state.isWidgetLibraryOpen);
    const toggleLibrary = useDashboardStore((state) => state.toggleWidgetLibrary);
    const addWidget = useDashboardStore((state) => state.addWidget);
    const layout = useDashboardStore((state) => state.layout);

    const categories = Array.from(
        new Set(widgetDefinitions.map((w) => w.category))
    );

    const filteredWidgets = widgetDefinitions.filter(
        (widget) =>
            widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            widget.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddWidget = (widgetDef: typeof widgetDefinitions[0]) => {
        // Calculate position for new widget
        const maxY = layout.length > 0
            ? Math.max(...layout.map(item => item.y + item.h))
            : 0;

        const newWidget: Widget = {
            i: `widget-${Date.now()}`,
            type: widgetDef.type,
            title: widgetDef.title,
        };

        const newLayoutItem = {
            i: newWidget.i,
            x: 0,
            y: maxY,
            w: widgetDef.defaultWidth,
            h: widgetDef.defaultHeight,
            minW: widgetDef.minWidth,
            minH: widgetDef.minHeight,
            maxW: widgetDef.maxWidth,
            maxH: widgetDef.maxHeight,
        };

        addWidget(newWidget, newLayoutItem);
        toggleLibrary();
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleLibrary}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 450 },
                    backgroundColor: '#1a1a1a',
                    backgroundImage: 'none',
                },
            }}
        >
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" fontWeight={700}>
                        Widget Library
                    </Typography>
                    <IconButton onClick={toggleLibrary}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search widgets..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {categories.map((category) => {
                    const categoryWidgets = filteredWidgets.filter(
                        (w) => w.category === category
                    );

                    if (categoryWidgets.length === 0) return null;

                    return (
                        <Box key={category} sx={{ mb: 3 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    fontWeight: 600,
                                    display: 'block',
                                    mb: 1,
                                }}
                            >
                                {category}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <List dense sx={{ p: 0 }}>
                                {categoryWidgets.map((widgetDef) => (
                                    <ListItemButton
                                        key={widgetDef.type}
                                        onClick={() => handleAddWidget(widgetDef)}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            p: 2,
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 212, 170, 0.15)',
                                            },
                                        }}
                                    >
                                        <Box sx={{ width: '100%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <Typography variant="h6">{widgetDef.icon}</Typography>
                                                <Typography variant="body1" fontWeight={600}>
                                                    {widgetDef.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {widgetDef.description}
                                            </Typography>
                                            <Chip
                                                label={`${widgetDef.defaultWidth} × ${widgetDef.defaultHeight}`}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    fontSize: '0.7rem',
                                                    height: 20,
                                                }}
                                            />
                                        </Box>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Box>
                    );
                })}
            </Box>
        </Drawer>
    );
};
