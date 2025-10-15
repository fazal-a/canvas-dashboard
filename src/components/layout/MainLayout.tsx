import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    Edit as EditIcon,
    Add as AddIcon,
    Event as EventIcon,
    Save as SaveIcon,
} from '@mui/icons-material';
import { TopNavigation } from './TopNavigation';
import { CommandCenter } from './CommandCenter';
import { WidgetLibrary } from '../widgets/WidgetLibrary';
import { DashboardCanvas } from './DashboardCanvas';
import { useDashboardStore } from '../../store/dashboardStore';

export const MainLayout: React.FC = () => {
    const [commandCenterOpen, setCommandCenterOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const user = useDashboardStore((state) => state.user);
    const widgets = useDashboardStore((state) => state.widgets);
    const isEditMode = useDashboardStore((state) => state.isEditMode);
    const toggleEditMode = useDashboardStore((state) => state.toggleEditMode);
    const toggleWidgetLibrary = useDashboardStore((state) => state.toggleWidgetLibrary);
    const saveCurrentLayout = useDashboardStore((state) => state.saveCurrentLayout);
    const loadFromLocalStorage = useDashboardStore((state) => state.loadFromLocalStorage);

    useEffect(() => {
        // Load saved dashboard on mount
        loadFromLocalStorage();
    }, [loadFromLocalStorage]);

    const handleSaveLayout = () => {
        const layoutName = prompt('Enter a name for this layout:');
        if (layoutName) {
            saveCurrentLayout(layoutName);
            setSnackbarMessage('Layout saved successfully!');
            setSnackbarOpen(true);
        }
    };

    const handleEditToggle = () => {
        toggleEditMode();
        if (!isEditMode) {
            setSnackbarMessage('Edit mode enabled - Drag widgets to rearrange');
        } else {
            setSnackbarMessage('Changes saved automatically');
        }
        setSnackbarOpen(true);
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
            <TopNavigation onCommandCenterOpen={() => setCommandCenterOpen(true)} />

            <CommandCenter
                open={commandCenterOpen}
                onClose={() => setCommandCenterOpen(false)}
            />

            <WidgetLibrary />

            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header Section */}
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={700}>
                            Welcome back, {user?.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                            Monday, September 08, 2025 • 24 appointments today
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        <Button
                            variant={isEditMode ? 'contained' : 'outlined'}
                            startIcon={<EditIcon />}
                            onClick={handleEditToggle}
                            color={isEditMode ? 'primary' : 'inherit'}
                        >
                            {isEditMode ? 'Done Editing' : 'Edit Dashboard'}
                        </Button>

                        {isEditMode && (
                            <Button
                                variant="outlined"
                                startIcon={<SaveIcon />}
                                onClick={handleSaveLayout}
                            >
                                Save Layout
                            </Button>
                        )}

                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={toggleWidgetLibrary}
                        >
                            Add Widget
                        </Button>

                        <Button variant="contained" startIcon={<EventIcon />}>
                            New Appointment
                        </Button>
                    </Box>
                </Box>

                {/* Dashboard Canvas */}
                {widgets.length === 0 ? (
                    <Box
                        sx={{
                            border: '2px dashed rgba(255, 255, 255, 0.2)',
                            borderRadius: 2,
                            p: 8,
                            textAlign: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            🎨 Your Canvas is Empty
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Start building your personalized dashboard by adding widgets
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={toggleWidgetLibrary}
                        >
                            Add Your First Widget
                        </Button>
                    </Box>
                ) : (
                    <DashboardCanvas />
                )}
            </Container>

            {/* Edit Mode Indicator */}
            {isEditMode && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 3,
                        py: 1.5,
                        borderRadius: 24,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        boxShadow: 4,
                        zIndex: 1000,
                    }}
                >
                    <EditIcon fontSize="small" />
                    Edit Mode Active - Drag to Rearrange
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
