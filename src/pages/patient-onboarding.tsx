import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    IconButton,
    Stepper,
    Step,
    StepLabel,
    StepButton,
    LinearProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    ArrowBack,
    Save as SaveIcon,
    ChevronRight,
    Check as CheckIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import OnboardingWidget from '@/components/onboarding/OnboardingWidget';
import SectionNavigation from '@/components/onboarding/SectionNavigation';
import { usePatientStore } from '@/store/patientStore';
import { PatientData, OnboardingSection } from '@/types/onboarding';
import { patientApi } from '@/services/patientApi';

const sections: OnboardingSection[] = [
    { id: 'who', title: 'Patient Information', icon: '👤', completed: false },
    { id: 'contact', title: 'Contact Details', icon: '📞', completed: false },
    { id: 'choices', title: 'Patient Preferences', icon: '⚙️', completed: false },
    { id: 'provider', title: 'Provider Information', icon: '👨‍⚕️', completed: false },
    { id: 'stats', title: 'Medical Statistics', icon: '📊', completed: false },
    { id: 'guardian', title: 'Guardian/Emergency', icon: '👥', completed: false },
    { id: 'employer', title: 'Employment Details', icon: '💼', completed: false },
];

export default function PatientOnboarding() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState(0);
    const [completedSections, setCompletedSections] = useState<number[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Zustand store
    const { patientData, setPatientData, clearPatientData } = usePatientStore();

    useEffect(() => {
        // Load saved progress from localStorage
        const savedProgress = localStorage.getItem('patientOnboarding');
        if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            setPatientData(parsed.patientData);
            setCompletedSections(parsed.completedSections || []);
        }
    }, [setPatientData]);

    const handleSectionComplete = (sectionId: string, data: any) => {
        const sectionIndex = sections.findIndex(s => s.id === sectionId);

        setPatientData({
            ...patientData,
            [sectionId]: data
        });

        if (!completedSections.includes(sectionIndex)) {
            setCompletedSections([...completedSections, sectionIndex]);
        }

        // Auto-advance to next section
        if (sectionIndex < sections.length - 1) {
            setActiveSection(sectionIndex + 1);
        }

        setSnackbarMessage('Section completed successfully!');
        setSnackbarOpen(true);
    };

    const handleSaveProgress = () => {
        localStorage.setItem('patientOnboarding', JSON.stringify({
            patientData,
            completedSections,
            timestamp: new Date().toISOString()
        }));

        setSnackbarMessage('Progress saved!');
        setSnackbarOpen(true);
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Submit all data to your APIs
            const result = await patientApi.createPatientComplete(patientData);

            // Clear store and localStorage
            clearPatientData();
            localStorage.removeItem('patientOnboarding');

            // Navigate to patient profile
            router.push(`/patients/${result.id}`);
        } catch (error) {
            console.error('Failed to submit patient data:', error);
            setSnackbarMessage('Error submitting patient data. Please try again.');
            setSnackbarOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = (completedSections.length / sections.length) * 100;

    return (
        <>
            <Head>
                <title>Patient Onboarding - OpenEMR</title>
            </Head>

            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                {/* Header */}
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: 'rgba(18, 18, 18, 0.95)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        p: 2,
                    }}
                >
                    <Container maxWidth="xl">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton onClick={() => router.push('/')} sx={{ color: 'white' }}>
                                    <ArrowBack />
                                </IconButton>
                                <Box>
                                    <Typography variant="h5" fontWeight={600}>
                                        New Patient Onboarding
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Complete all sections to register a new patient
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSaveProgress}
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        }
                                    }}
                                >
                                    Save Progress
                                </Button>
                                <Button
                                    variant="contained"
                                    endIcon={<ChevronRight />}
                                    onClick={handleFinalSubmit}
                                    disabled={completedSections.length < sections.length || isSubmitting}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'black',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        }
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Paper>

                {/* Progress */}
                <Box sx={{ bgcolor: 'rgba(18, 18, 18, 0.5)', p: 2 }}>
                    <Container maxWidth="xl">
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Overall Progress</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {completedSections.length} of {sections.length} completed
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        background: 'linear-gradient(90deg, rgb(0, 212, 170) 0%, rgb(0, 102, 255) 100%)',
                                    }
                                }}
                            />
                        </Box>

                        {/* Stepper */}
                        <Stepper activeStep={activeSection} alternativeLabel>
                            {sections.map((section, index) => (
                                <Step key={section.id} completed={completedSections.includes(index)}>
                                    <StepButton onClick={() => setActiveSection(index)}>
                                        <StepLabel
                                            StepIconProps={{
                                                sx: {
                                                    color: completedSections.includes(index)
                                                        ? 'success.main'
                                                        : 'rgba(255, 255, 255, 0.3)',
                                                    '&.Mui-active': { color: 'primary.main' },
                                                    '&.Mui-completed': { color: 'success.main' },
                                                }
                                            }}
                                        >
                                            {section.title}
                                        </StepLabel>
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Container>
                </Box>

                {/* Main Content */}
                <Container maxWidth="xl" sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        {/* Section Navigation */}
                        <Box sx={{ width: 300, flexShrink: 0 }}>
                            <SectionNavigation
                                sections={sections}
                                activeSection={activeSection}
                                completedSections={completedSections}
                                onSectionClick={setActiveSection}
                            />
                        </Box>

                        {/* Active Section Widget */}
                        <Box sx={{ flex: 1 }}>
                            <OnboardingWidget
                                section={sections[activeSection]}
                                sectionIndex={activeSection}
                                existingData={patientData[sections[activeSection].id]}
                                onComplete={handleSectionComplete}
                                onSave={handleSaveProgress}
                            />
                        </Box>
                    </Box>
                </Container>

                {/* Snackbar */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}
