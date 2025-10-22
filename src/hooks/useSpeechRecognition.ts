import {useState, useRef, useCallback} from 'react';

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
    const audioContextRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
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

            const API_ENDPOINT = `wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&format_turns=true&token=${API_KEY}`;

            // 1. Create WebSocket
            const socket = new WebSocket(API_ENDPOINT);
            socketRef.current = socket;

            socket.onopen = async () => {
                console.log('WebSocket Connected');

                try {
                    // 2. Get microphone stream
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            channelCount: 1,
                            sampleRate: 16000,
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: true,
                        }
                    });

                    streamRef.current = stream;

                    // 3. Create AudioContext for raw PCM processing
                    const audioContext = new AudioContext({sampleRate: 16000});
                    audioContextRef.current = audioContext;

                    const source = audioContext.createMediaStreamSource(stream);

                    // 4. Create ScriptProcessor to get raw PCM data
                    const processor = audioContext.createScriptProcessor(4096, 1, 1);
                    processorRef.current = processor;

                    processor.onaudioprocess = (e) => {
                        if (socket.readyState === WebSocket.OPEN) {
                            // Get raw PCM Float32 data
                            const inputData = e.inputBuffer.getChannelData(0);

                            // Convert Float32 [-1, 1] to Int16 [-32768, 32767]
                            const int16Data = new Int16Array(inputData.length);
                            for (let i = 0; i < inputData.length; i++) {
                                const s = Math.max(-1, Math.min(1, inputData[i]));
                                int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                            }

                            console.log('Sending PCM:', int16Data.byteLength, 'bytes');
                            socket.send(int16Data.buffer);
                        }
                    };

                    // Connect the audio graph
                    source.connect(processor);
                    processor.connect(audioContext.destination);

                    setIsRecording(true);
                    console.log('Recording started (Raw PCM)');

                } catch (err) {
                    console.error(' Microphone error:', err);
                    setError('Microphone access denied');
                    socket.close();
                }
            };

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('Message type:', data.type);

                    if (data.type === 'Begin') {
                        console.log('Session started:', data.id);
                        console.log('Expires:', new Date(data.expires_at * 1000).toLocaleTimeString());
                    } else if (data.type === 'Turn') {
                        const text = data.transcript || '';
                        console.log('Transcript:', text);
                        console.log('Formatted:', data.turn_is_formatted);
                        console.log('End of turn:', data.end_of_turn);

                        if (data.turn_is_formatted) {
                            setTranscript(prev => {
                                const updated = prev + text + ' ';
                                console.log('Full transcript:', updated);
                                return updated;
                            });
                        } else {
                            setTranscript(prev => {
                                const lastSpace = prev.lastIndexOf(' ');
                                const updated = prev.substring(0, lastSpace + 1) + text;
                                console.log('Partial transcript:', updated);
                                return updated;
                            });
                        }
                    } else if (data.type === 'Termination') {
                        console.log('Session terminated');
                    } else {
                        console.warn('Unknown type:', data.type);
                    }
                } catch (err) {
                    console.error('Parse error:', err);
                }
            };

            socket.onerror = (err) => {
                console.error('WebSocket error:', err);
                setError('Connection failed');
            };

            socket.onclose = (event) => {
                console.log('WebSocket closed:', event.code);
                setIsRecording(false);
            };

        } catch (err: any) {
            console.error('Start failed:', err);
            setError('Failed to start: ' + err.message);
        }
    }, []);

    const stopRecording = useCallback(() => {
        console.log('Stopping recording...');
        // Disconnect audio processor
        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }

        // Close audio context
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        // Stop media stream
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                console.log('Stopping:', track.label);
                track.stop();
            });
            streamRef.current = null;
        }

        // Close WebSocket
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            console.log('Sending Terminate');
            socketRef.current.send(JSON.stringify({type: 'Terminate'}));
            socketRef.current.close();
            socketRef.current = null;
        }

        setIsRecording(false);
        console.log('Stopped');
    }, []);

    const clearTranscript = useCallback(() => {
        setTranscript('');
        console.log('Transcript cleared');
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
