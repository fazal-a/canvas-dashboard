import React, {useState} from 'react';
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
import {useDashboardStore} from '@/store/dashboardStore';

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
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
        >
            <Toolbar sx={{justifyContent: 'space-between', gap: 2}}>
                {/* Left Section */}
                <Box sx={{display: 'flex', alignItems: 'center', gap: 3}}>
                    <Typography
                        variant="h6"
                        sx={{
                            background: 'linear-gradient(135deg, #00D48A 0%, #06B6D4 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                        }}
                    >
                        Outsquare MD
                    </Typography>

                    <TextField
                        placeholder="Search patients, appointments..."
                        size="small"
                        sx={{
                            width: 400,
                            display: {xs: 'none', md: 'block'},
                            '& .MuiOutlinedInput-root': {
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s',
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    '& fieldset': {
                                        borderColor: 'rgba(0, 212, 138, 0.5)',
                                    },
                                },
                                '&.Mui-focused': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 0 20px rgba(0, 212, 138, 0.2)',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{opacity: 0.6}}/>
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
                        display: {xs: 'none', md: 'flex'},
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
                    <Tab label="Dashboard"/>
                    <Tab label="Patients"/>
                    <Tab label="Schedule"/>
                    <Tab label="Reports"/>
                </Tabs>


                {/* Icon buttons with hover glow */}
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
                    <IconButton
                        onClick={onCommandCenterOpen}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.3s',
                            '&:hover': {
                                background: 'rgba(0, 212, 138, 0.15)',
                                boxShadow: '0 0 20px rgba(0, 212, 138, 0.3)',
                            },
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <IconButton>
                        <Badge badgeContent={12} color="error">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>

                    <Avatar
                        sx={{
                            background: 'linear-gradient(135deg, #00D48A 0%, #06B6D4 100%)',
                            cursor: 'pointer',
                            width: 40,
                            height: 40,
                            border: '2px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 0 20px rgba(0, 212, 138, 0.4)',
                            },
                        }}
                    >
                        {user?.name.charAt(0) || 'U'}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
