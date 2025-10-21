import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    Paper,
    Alert
} from '@mui/material';
import {
    Mic,
    Stop,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import {WidgetContainer} from '../WidgetContainer';
import {Widget} from '@/types';
import {useSpeechRecognition} from '@/hooks/useSpeechRecognition';

interface VoiceNoteProps {
    widget: Widget;
}

export const VoiceNote: React.FC<VoiceNoteProps> = ({widget}) => {
    const {
        isRecording,
        transcript,
        startRecording,
        stopRecording,
        clearTranscript,
        error
    } = useSpeechRecognition();
    console.log("transcript", transcript);

    return (
        <WidgetContainer widget={widget}>
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                {/* Control Buttons */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 2
                }}>
                    <IconButton
                        onClick={isRecording ? stopRecording : startRecording}
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: isRecording ? 'error.main' : 'primary.main',
                            '&:hover': {
                                bgcolor: isRecording ? 'error.dark' : 'primary.dark',
                                transform: 'scale(1.05)'
                            },
                            transition: 'all 0.2s',
                            boxShadow: isRecording ? '0 0 20px rgba(255, 68, 68, 0.5)' : 'none'
                        }}
                    >
                        {isRecording ? (
                            <Stop fontSize="large"/>
                        ) : (
                            <Mic fontSize="large"/>
                        )}
                    </IconButton>

                    {transcript && !isRecording && (
                        <IconButton
                            onClick={clearTranscript}
                            sx={{
                                width: 64,
                                height: 64,
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                '&:hover': {bgcolor: 'rgba(255, 255, 255, 0.2)'}
                            }}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    )}
                </Box>

                {/* Status */}
                <Typography
                    variant="caption"
                    color={isRecording ? 'primary.main' : 'text.secondary'}
                    sx={{
                        textAlign: 'center',
                        mb: 2,
                        fontWeight: isRecording ? 600 : 400
                    }}
                >
                    {isRecording ? '🔴 Recording... Speak now' : 'Click microphone to start'}
                </Typography>

                {/* Error Display */}
                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

                {/* Transcript Display */}
                <Paper
                    sx={{
                        flex: 1,
                        p: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        overflowY: 'auto',
                        minHeight: 150,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    {transcript ? (
                        <Typography variant="body2" sx={{whiteSpace: 'pre-wrap'}}>
                            {transcript}
                        </Typography>
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{fontStyle: 'italic'}}
                        >
                            Your transcription will appear here...
                        </Typography>
                    )}
                </Paper>
            </Box>
        </WidgetContainer>
    );
};
