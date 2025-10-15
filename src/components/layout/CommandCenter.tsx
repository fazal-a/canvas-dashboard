import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Grid,
    Card,
    CardContent,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Box,
} from '@mui/material';
import {
    Close as CloseIcon,
    Dashboard,
    People,
    Event,
    Message,
    AttachMoney,
    Assessment,
    Settings,
    Help,
} from '@mui/icons-material';

interface CommandCenterProps {
    open: boolean;
    onClose: () => void;
}

const menuCategories = [
    {
        title: 'Dashboard & Views',
        icon: <Dashboard />,
        items: ['Home Dashboard', 'Calendar View', 'Analytics', 'Activity Feed'],
    },
    {
        title: 'Patient Management',
        icon: <People />,
        items: [
            'Patient Finder',
            'New Patient',
            'Patient Demographics',
            'Patient Flow Board',
            'Patient Summary',
            'Patient Portal',
        ],
    },
    {
        title: 'Scheduling',
        icon: <Event />,
        items: [
            'Appointment Calendar',
            'New Appointment',
            'Recurring Appointments',
            'Appointment Recalls',
            'Waitlist',
        ],
    },
    {
        title: 'Communications',
        icon: <Message />,
        items: [
            'Messages',
            'Patient Communications',
            'SMS/Email Campaigns',
            'Notifications',
            'Call Logs',
        ],
    },
    {
        title: 'Billing & Financial',
        icon: <AttachMoney />,
        items: [
            'Billing',
            'Invoices',
            'Payments',
            'Financial Reports',
            'Claims Management',
            'Fee Sheet',
        ],
    },
    {
        title: 'Reports & Analytics',
        icon: <Assessment />,
        items: [
            'Clinical Reports',
            'Administrative Reports',
            'Financial Reports',
            'Custom Reports',
            'Quality Measures',
        ],
    },
    {
        title: 'Administrative',
        icon: <Settings />,
        items: [
            'User Management',
            'Facility Settings',
            'Provider Profiles',
            'Inventory',
            'Security & Audit',
            'System Settings',
        ],
    },
    {
        title: 'Help & Support',
        icon: <Help />,
        items: ['Documentation', 'Training Videos', 'Support Chat', 'Report Issue'],
    },
];

export const CommandCenter: React.FC<CommandCenterProps> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#1a1a1a',
                    backgroundImage: 'none',
                    borderRadius: 3,
                    maxHeight: '85vh',
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Typography variant="h4" fontWeight={700}>
                    Command Center
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                <Grid container spacing={3}>
                    {menuCategories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} key={category.title}>
                            <Card
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    height: '100%',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 2,
                                            color: 'primary.main',
                                        }}
                                    >
                                        {category.icon}
                                        <Typography variant="h6" fontWeight={600}>
                                            {category.title} category.title
                                        </Typography>
                                    </Box>

                                    <List dense sx={{ p: 0 }}>
                                        {category.items.map((item) => (
                                            <ListItemButton
                                                key={item}
                                                sx={{
                                                    borderRadius: 1,
                                                    mb: 0.5,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 212, 170, 0.2)',
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={item}
                                                    primaryTypographyProps={{
                                                        fontSize: '0.875rem',
                                                    }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
