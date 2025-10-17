import React from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    Box,
    Chip,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { OnboardingSection } from '@/types/onboarding';

interface SectionNavigationProps {
    sections: OnboardingSection[];
    activeSection: number;
    completedSections: number[];
    onSectionClick: (index: number) => void;
}

export default function SectionNavigation({
                                              sections,
                                              activeSection,
                                              completedSections,
                                              onSectionClick
                                          }: SectionNavigationProps) {
    return (
        <Paper
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                p: 2,
            }}
        >
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                SECTIONS
            </Typography>

            <List>
                {sections.map((section, index) => (
                    <ListItemButton
                        key={section.id}
                        selected={activeSection === index}
                        onClick={() => onSectionClick(index)}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            borderLeft: completedSections.includes(index) ? '3px solid' : 'none',
                            borderLeftColor: 'success.main',
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 212, 170, 0.2)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <Typography variant="h5">{section.icon}</Typography>
                        </ListItemIcon>
                        <ListItemText
                            primary={section.title}
                            secondary={
                                completedSections.includes(index) && (
                                    <Chip
                                        icon={<CheckIcon />}
                                        label="Completed"
                                        color="success"
                                        size="small"
                                        sx={{ mt: 0.5 }}
                                    />
                                )
                            }
                        />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
}
