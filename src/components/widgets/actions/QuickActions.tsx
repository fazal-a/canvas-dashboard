import React from 'react';
import { Button, Stack } from '@mui/material';
import {
    PersonAdd as PersonAddIcon,
    Event as EventIcon,
    Message as MessageIcon,
    Description as DescriptionIcon,
    LocalPharmacy as PharmacyIcon,
    Science as ScienceIcon,
} from '@mui/icons-material';
import { WidgetContainer } from '../WidgetContainer';
import { Widget } from '../../../types';

interface QuickActionsProps {
    widget: Widget;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ widget }) => {
    const actions = [
        { label: 'New Patient', icon: <PersonAddIcon />, color: 'primary' },
        { label: 'Schedule', icon: <EventIcon />, color: 'primary' },
        { label: 'Messages', icon: <MessageIcon />, color: 'primary' },
        { label: 'New Note', icon: <DescriptionIcon />, color: 'secondary' },
        { label: 'E-Prescribe', icon: <PharmacyIcon />, color: 'secondary' },
        { label: 'Order Labs', icon: <ScienceIcon />, color: 'secondary' },
    ];

    return (
        <WidgetContainer widget={widget}>
            <Stack spacing={1}>
                {actions.map((action) => (
                    <Button
                        key={action.label}
                        variant="outlined"
                        startIcon={action.icon}
                        fullWidth
                        color={action.color as any}
                        sx={{
                            justifyContent: 'flex-start',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            textAlign: 'left',
                            '&:hover': {
                                borderColor: 'primary.main',
                                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                            },
                        }}
                    >
                        {action.label}
                    </Button>
                ))}
            </Stack>
        </WidgetContainer>
    );
};
