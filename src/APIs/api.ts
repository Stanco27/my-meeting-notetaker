import axios from  'axios';


// Function to get the transcription of an audio file
export const getTranscription = async (transciptId: string) => {

    try {
        const response = await axios.get(`http://localhost:5000/getTranscription/${transciptId}`);
        return response.data;
    } catch (error) {
        console.error('Error uploading audio file:', error);
        throw error;
    }
}

export const startTranscription = async (audioUrl: string) => {
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

// Functions to utilize Groq API
export const getMainTopics = async (transcript: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/getMainTopics${transcript}`);
        return response.data;
    } catch (error) {
        console.error('Error getting main topics:', error);
        throw error;
    }
}

export const createFlashCards = async (mainTopics: string[]) => {
    try {
        const response = await axios.post('http://localhost:5000/createFlashCards', { mainTopics });
        return response.data;
    } catch (error) {
        console.error('Error creating flash cards:', error);
        throw error;
    }
}