import {createTheme} from '@mui/material/styles';


const colors = {
    // Primary - Vibrant Green
    primary: {
        50: '#E8FFF5',
        100: '#CCFFE8',
        200: '#99FFD1',
        300: '#66FFBA',
        400: '#33FFA3',
        500: '#00D48A', // Main
        600: '#00B872',
        700: '#009659',
        800: '#007441',
        900: '#005228',
    },

    // Secondary - Electric Blue/Purple
    secondary: {
        50: '#EEF2FF',
        100: '#E0E7FF',
        200: '#C7D2FE',
        300: '#A5B4FC',
        400: '#818CF8',
        500: '#6366F1',
        600: '#4F46E5',
        700: '#4338CA',
        800: '#3730A3',
        900: '#312E81',
    },

    // Accent - Cyan/Teal
    accent: {
        500: '#06B6D4',
        600: '#0891B2',
    },

    // Background layers
    background: {
        primary: '#0A0A0A',      // Deepest black
        secondary: '#0F0F0F',    // Base layer
        tertiary: '#1A1A1A',     // Cards
        elevated: '#1F1F1F',     // Elevated surfaces
        hover: '#252525',        // Hover state
    },

    // Text hierarchy
    text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.70)',
        tertiary: 'rgba(255, 255, 255, 0.50)',
        disabled: 'rgba(255, 255, 255, 0.30)',
    },

    // Semantic colors
    success: '#00D48A',
    error: '#FF4757',
    warning: '#FFB800',
    info: '#0891B2',

    // Borders
    border: {
        subtle: 'rgba(255, 255, 255, 0.06)',
        default: 'rgba(255, 255, 255, 0.10)',
        strong: 'rgba(255, 255, 255, 0.15)',
    }
};

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.primary[500],
            light: colors.primary[400],
            dark: colors.primary[700],
            contrastText: '#000000',
        },
        secondary: {
            main: colors.secondary[500],
            light: colors.secondary[400],
            dark: colors.secondary[700],
            contrastText: '#FFFFFF',
        },
        background: {
            default: colors.background.secondary,
            paper: colors.background.tertiary,
        },
        text: {
            primary: colors.text.primary,
            secondary: colors.text.secondary,
            disabled: colors.text.disabled,
        },
        divider: colors.border.default,
        error: {
            main: colors.error,
            light: '#FF6B7A',
            dark: '#E63946',
        },
        warning: {
            main: colors.warning,
            light: '#FFC933',
            dark: '#CC9300',
        },
        success: {
            main: colors.success,
            light: '#00FFAA',
            dark: '#00A86B',
        },
        info: {
            main: colors.info,
            light: '#22D3EE',
            dark: '#0E7490',
        },
    },

    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2.25rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.875rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.005em',
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '0.9375rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.01em',
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.4,
        },
    },

    shape: {
        borderRadius: 12,
    },

    shadows: [
        'none',
        '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
        ...Array(17).fill('none'),
    ],

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '10px 24px',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                },
                contained: {
                    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
                    boxShadow: '0 4px 12px rgba(0, 212, 138, 0.25)',
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[500]} 100%)`,
                        boxShadow: '0 6px 20px rgba(0, 212, 138, 0.35)',
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                },
                outlined: {
                    borderColor: colors.border.strong,
                    color: colors.text.primary,
                    '&:hover': {
                        borderColor: colors.primary[500],
                        backgroundColor: 'rgba(0, 212, 138, 0.08)',
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    // backgroundImage: 'none',
                    backgroundColor: colors.background.tertiary,
                    backgroundImage: `linear-gradient(145deg, ${colors.background.tertiary} 0%, ${colors.background.secondary} 100%)`,
                    border: `1px solid ${colors.border.subtle}`,
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        borderColor: colors.border.default,
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                    },
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: colors.background.tertiary,
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                },
                elevation2: {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: colors.background.secondary,
                        transition: 'all 0.2s',
                        '& fieldset': {
                            borderColor: colors.border.default,
                            transition: 'border-color 0.2s',
                        },
                        '&:hover fieldset': {
                            borderColor: colors.border.strong,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.primary[500],
                            borderWidth: 2,
                        },
                        '&.Mui-focused': {
                            backgroundColor: colors.background.elevated,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: colors.text.secondary,
                        '&.Mui-focused': {
                            color: colors.primary[500],
                        },
                    },
                },
            },
        },

        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.secondary,
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: 8,
                },
                filled: {
                    backgroundColor: colors.background.elevated,
                    border: `1px solid ${colors.border.subtle}`,
                },
            },
        },

        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: colors.background.elevated,
                },
                bar: {
                    borderRadius: 3,
                    background: `linear-gradient(90deg, ${colors.primary[500]} 0%, ${colors.secondary[500]} 100%)`,
                },
            },
        },

        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid',
                },
                standardSuccess: {
                    backgroundColor: 'rgba(0, 212, 138, 0.1)',
                    borderColor: colors.success,
                    color: colors.text.primary,
                },
                standardError: {
                    backgroundColor: 'rgba(255, 71, 87, 0.1)',
                    borderColor: colors.error,
                    color: colors.text.primary,
                },
                standardWarning: {
                    backgroundColor: 'rgba(255, 184, 0, 0.1)',
                    borderColor: colors.warning,
                    color: colors.text.primary,
                },
                standardInfo: {
                    backgroundColor: 'rgba(8, 145, 178, 0.1)',
                    borderColor: colors.info,
                    color: colors.text.primary,
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: colors.background.primary,
                    backdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${colors.border.subtle}`,
                },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s',
                    '&:hover': {
                        backgroundColor: colors.background.hover,
                    },
                },
            },
        },
    },
});

// Export color utilities for use in components
export const gradients = {
    primary: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
    secondary: `linear-gradient(135deg, ${colors.secondary[500]} 0%, ${colors.secondary[600]} 100%)`,
    accent: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.secondary[500]} 100%)`,
    success: `linear-gradient(135deg, #00D48A 0%, #00A86B 100%)`,
    vibrant: `linear-gradient(135deg, #00D48A 0%, #06B6D4 50%, #6366F1 100%)`,
    card: `linear-gradient(145deg, ${colors.background.tertiary} 0%, ${colors.background.secondary} 100%)`,
    glow: `radial-gradient(circle at 50% 0%, rgba(0, 212, 138, 0.15) 0%, transparent 50%)`,
};

export {colors};
