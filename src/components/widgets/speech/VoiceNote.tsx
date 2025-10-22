import React, {useState} from "react";
import {
    Box,
    IconButton,
    Typography,
    Paper,
    Alert,
    Button
} from '@mui/material';
import {
    Mic,
    Stop,
    Delete as DeleteIcon, Upload
} from '@mui/icons-material';
import {WidgetContainer} from '../WidgetContainer';
import {Widget} from '@/types';
import {useAudioRecorder} from "@/hooks/useAudioRecorder";
import {uploadAudioFile} from "@/lib/uploadAudioFile";

interface VoiceNoteProps {
    widget: Widget;
}

export const VoiceNote: React.FC<VoiceNoteProps> = ({widget}) => {

    const {isRecording, audioBlob, startRecording, stopRecording, clearRecording, error} =
        useAudioRecorder();

    const [transcript, setTranscript] = useState("");
    const [uploading, setUploading] = useState(false);

    const [deleting, setDeleting] = useState(false);


    const handleUpload = async () => {
        if (!audioBlob) return;
        setUploading(true);
        try {
            console.log("hit handleUpload try section")
            const res = await uploadAudioFile(audioBlob);
            setTranscript(res.transcript || JSON.stringify(res, null, 2));
        } catch (err: any) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };


    const handleDelete = async () => {
        if (!audioBlob) return;
        setDeleting(true);
        try {
            console.log("hit handleDelete try section")
            clearRecording();
            setTranscript("");
        } catch (err: any) {
            console.error(err);
        } finally {
            setDeleting(false);
        }
    };

    console.log("transcript::::", transcript)

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

                    {audioBlob && !isRecording && (
                        <Button
                            variant="contained"
                            startIcon={<Upload/>}
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </Button>
                    )}
                    {audioBlob && !isRecording && (
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'rgba(225,48,48,1)',
                                color: 'white'
                            }}
                            startIcon={<DeleteIcon/>}
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </Button>
                    )}

                </Box>

                {error && <Alert severity="error">{error}</Alert>}

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
                    ) : audioBlob ? (
                        <Typography variant="caption" color="text.secondary">
                            Audio recorded. Click upload to send.
                        </Typography>
                    ) : (
                        <Typography variant="caption" color="text.secondary">
                            {isRecording ? "Recording..." : "Press mic to start"}
                        </Typography>
                    )}
                </Paper>
            </Box>
        </WidgetContainer>
    );
};
