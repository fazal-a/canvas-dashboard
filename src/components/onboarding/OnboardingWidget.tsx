import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Button,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    InputLabel,
    FormHelperText,
    Box,
    Typography,
    Chip,
} from '@mui/material';
import {
    Save as SaveIcon,
    Check as CheckIcon,
    Error as ErrorIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OnboardingSection } from '@/types/onboarding';
import { sectionFields } from '@/config/onboardingFields';

interface OnboardingWidgetProps {
    section: OnboardingSection;
    sectionIndex: number;
    existingData?: any;
    onComplete: (sectionId: string, data: any) => void;
    onSave: () => void;
}

export default function OnboardingWidget({
                                             section,
                                             sectionIndex,
                                             existingData,
                                             onComplete,
                                             onSave
                                         }: OnboardingWidgetProps) {
    const [formData, setFormData] = useState(existingData || {});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fields = sectionFields[section.id as keyof typeof sectionFields] || [];

    useEffect(() => {
        setFormData(existingData || {});
        setErrors({});
    }, [section.id, existingData]);

    const handleFieldChange = (fieldName: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [fieldName]: value }));
        // Clear error for this field
        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }
            if (field.pattern && formData[field.name]) {
                const regex = new RegExp(field.pattern);
                if (!regex.test(formData[field.name])) {
                    newErrors[field.name] = `Invalid format for ${field.label}`;
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        onComplete(section.id, formData);
        setIsSubmitting(false);
    };

    const renderField = (field: any) => {
        switch (field.type) {
            case 'date':
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label={field.label}
                            value={formData[field.name] || null}
                            onChange={(newValue) => handleFieldChange(field.name, newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: Boolean(errors[field.name]),
                                    helperText: errors[field.name],
                                    required: field.required,
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                );

            case 'select':
                return (
                    <FormControl fullWidth error={Boolean(errors[field.name])}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            label={field.label}
                            sx={{
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.23)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                },
                            }}
                        >
                            <MenuItem value="">
                                <em>Select {field.label}</em>
                            </MenuItem>
                            {field.options?.map((opt: string) => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </Select>
                        {errors[field.name] && (
                            <FormHelperText>{errors[field.name]}</FormHelperText>
                        )}
                    </FormControl>
                );

            case 'checkbox':
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData[field.name] || false}
                                onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            />
                        }
                        label={field.label}
                    />
                );

            default:
                return (
                    <TextField
                        fullWidth
                        label={field.label}
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        error={Boolean(errors[field.name])}
                        helperText={errors[field.name]}
                        required={field.required}
                        multiline={field.type === 'textarea'}
                        rows={field.type === 'textarea' ? 4 : 1}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                            },
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiFormHelperText-root': { color: 'error.main' },
                        }}
                    />
                );
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h4">{section.icon}</Typography>
                        <Box>
                            <Typography variant="h6">{section.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Complete all required fields
                            </Typography>
                        </Box>
                    </Box>
                }
                action={
                    existingData && (
                        <Chip
                            icon={<CheckIcon />}
                            label="Section Saved"
                            color="success"
                            size="small"
                        />
                    )
                }
            />

            <CardContent>
                <Grid container spacing={3}>
                    {fields.map((field: any) => (
                        <Grid
                            item
                            xs={12}
                            md={field.type === 'textarea' ? 12 : 6}
                            key={field.name}
                        >
                            {renderField(field)}
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                        sx={{
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                        }}
                    >
                        Save Progress
                    </Button>

                    <Button
                        variant="contained"
                        endIcon={<CheckIcon />}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'black',
                        }}
                    >
                        {isSubmitting ? 'Saving...' : 'Complete Section'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
