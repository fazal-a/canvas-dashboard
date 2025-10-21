import {useState, useRef, useCallback} from 'react';

// Dynamic import for RecordRTC
let RecordRTC: any = null;
if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    RecordRTC = require('recordrtc');
}

interface UseSpeechRecognitionReturn {
    isRecording: boolean;
    transcript: string;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    clearTranscript: () => void;
    error: string | null;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    const socketRef = useRef<WebSocket | null>(null);
    const recorderRef = useRef<any>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = useCallback(async () => {
        if (typeof window === 'undefined') return;

        try {
            setError(null);

            const API_KEY = process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY;

            if (!API_KEY) {
                setError('API key not found');
                return;
            }

            // Manual query string
            const API_ENDPOINT = `wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&format_turns=true&token=${API_KEY}`;

            const socket = new WebSocket(API_ENDPOINT);
            socketRef.current = socket;

            socket.onopen = async () => {
                console.log('Connected');

                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            channelCount: 1,
                            sampleRate: 16000,
                            echoCancellation: true,
                            noiseSuppression: true,
                        }
                    });

                    streamRef.current = stream;

                    const recorder = new RecordRTC(stream, {
                        type: 'audio',
                        mimeType: 'audio/webm;codecs=pcm',
                        recorderType: RecordRTC.StereoAudioRecorder,
                        timeSlice: 250,
                        desiredSampRate: 16000,
                        numberOfAudioChannels: 1,
                        ondataavailable: (blob: Blob) => {
                            if (socket.readyState === WebSocket.OPEN) {
                                socket.send(blob);
                            }
                        }
                    });

                    recorderRef.current = recorder;
                    recorder.startRecording();
                    setIsRecording(true);
                } catch (err) {
                    console.error('Mic error:', err);
                    setError('Microphone denied');
                    socket.close();
                }
            };

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (data.type === 'Begin') {
                        console.log('Session started');
                        console.log("inside the begin")
                    } else if (data.type === 'Turn') {
                        const text = data.transcript || '';
                        console.log("inside the else if")

                        if (data.turn_is_formatted) {
                            setTranscript(prev => prev + text + ' ');
                        } else {
                            setTranscript(prev => {
                                const lines = prev.split('\n');
                                lines[lines.length - 1] = text;
                                return lines.join('\n');
                            });
                        }
                    }
                } catch (err) {
                    console.error('Parse error:', err);
                }
            };

            socket.onerror = () => setError('Connection failed');
            socket.onclose = () => setIsRecording(false);

        } catch (err) {
            setError('Start failed');
        }
    }, []);


    const stopRecording = useCallback(() => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                recorderRef.current?.destroy();
                recorderRef.current = null;
            });
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({type: 'Terminate'}));
            socketRef.current.close();
            socketRef.current = null;
        }

        setIsRecording(false);
    }, []);

    const clearTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return {
        isRecording,
        transcript,
        startRecording,
        stopRecording,
        clearTranscript,
        error
    };
};
