import axios from  'axios';

export const getTranscription = async (transciptId: string) => {

    try {
        const response = await axios.get(`http://localhost:5000/getTranscription/${transciptId}`);
        return response.data;
    } catch (error) {
        console.error('Error uploading audio file:', error);
        throw error;
    }
}

export const startTranscription = async (audioUrl: File) => {
    try {
        const response = await axios.post('http://localhost:5000/TranscribeAudio', { audioUrl });
        return response.data;
    } catch (error) {
        console.error('Error starting transcription:', error);
        throw error;
    }
}

export const uploadAudioFile = async (audioFile: File) => {
    const formData = new FormData();
    formData.append('audioFile', audioFile);

    try {
        const response = await axios.post('http://localhost:5000/uploadAudioFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading audio file:', error);
        throw error;
    }
}