import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    IconButton,
    Avatar,
    Badge,
    Tabs,
    Tab,
    Box,
    InputAdornment,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { useDashboardStore } from '../../store/dashboardStore';

interface TopNavigationProps {
    onCommandCenterOpen: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
                                                                onCommandCenterOpen,
                                                            }) => {
    const [activeTab, setActiveTab] = useState(0);
    const user = useDashboardStore((state) => state.user);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'rgba(18, 18, 18, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
                {/* Left Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                        }}
                    >
                        Outsquare MD
                    </Typography>

                    <TextField
                        placeholder="Search patients, appointments..."
                        size="small"
                        sx={{
                            width: 350,
                            display: { xs: 'none', md: 'block' },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ opacity: 0.5 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Center Section - Tabs */}
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        '& .MuiTab-root': {
                            color: 'rgba(255, 255, 255, 0.6)',
                            minHeight: 64,
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'primary.main',
                        },
                    }}
                >
                    <Tab label="Dashboard" />
                    <Tab label="Patients" />
                    <Tab label="Schedule" />
                    <Tab label="Reports" />
                </Tabs>

                {/* Right Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IconButton
                        onClick={onCommandCenterOpen}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <IconButton>
                        <Badge badgeContent={12} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                        <SettingsIcon />
                    </IconButton>

                    <Avatar
                        sx={{
                            background: 'linear-gradient(135deg, #00d4aa, #0066ff)',
                            cursor: 'pointer',
                            width: 36,
                            height: 36,
                        }}
                    >
                        {user?.name.charAt(0) || 'U'}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
