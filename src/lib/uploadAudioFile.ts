export const uploadAudioFile = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");

    const response = await fetch("http://10.10.0.18:8501/api/transcribe-file", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) throw new Error("Upload failed");

    return await response.json();
};
