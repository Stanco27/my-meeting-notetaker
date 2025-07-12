"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranscription = exports.startTranscription = exports.uploadAudioFile = void 0;
const assemblyai_1 = require("assemblyai");
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const headers = {
    "authorization": process.env.ASSEMBLYAI_API_KEY || "",
};
const client = new assemblyai_1.AssemblyAI({
    // .env file should contain your AssemblyAI API key
    apiKey: headers.authorization,
});
const baseUrl = "https://api.assemblyai.com";
const uploadAudioFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No audio file uploaded." });
    }
    const audioFilePath = req.file.path;
    console.log(`Audio file uploaded successfully: ${audioFilePath}`);
    try {
        const audioData = await fs_extra_1.default.readFile(audioFilePath);
        const uploadResponse = await axios_1.default.post(`${baseUrl}/v2/upload`, audioData, {
            headers,
        });
        const audioUrl = uploadResponse.data.upload_url;
        const params = {
            audio_url: audioUrl,
            speech_model: "universal",
        };
        console.log(`Initiating AssemblyAI transcription for: ${audioUrl}`);
        const transcript = await client.transcripts.create(params);
        console.log(`Transcription job started. ID: ${transcript.id}, Status: ${transcript.status}`);
        await fs_extra_1.default.unlink(audioFilePath);
        return res.status(202).json({
            message: "Transcription job started successfully",
            transcriptId: transcript.id,
            status: transcript.status
        });
    }
    catch (error) {
        console.error("Error in uploadAudioFile:", error);
        return res.status(500).json({ error: "Internal Server Error uploading audio file" });
    }
};
exports.uploadAudioFile = uploadAudioFile;
const startTranscription = async (req, res) => {
    const { audioUrl } = req.body;
    try {
        if (!audioUrl) {
            return res.status(400).json({ error: "audioUrl is required in the request body." });
        }
        const params = {
            audio_url: audioUrl,
            speech_model: "universal",
        };
        console.log(`Initiating AssemblyAI transcription for: ${audioUrl}`);
        const transcript = await client.transcripts.create(params);
        console.log(`Transcription job started. ID: ${transcript.id}, Status: ${transcript.status}`);
        return res.status(202).json({
            message: "Transcription job started successfully",
            transcriptId: transcript.id,
            status: transcript.status
        });
    }
    catch (error) {
        console.error("Error in startTranscription:", error);
        if (error instanceof Error) {
            return res.status(500).json({ error: "Internal Server Error initiating transcription", details: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error initiating transcription" });
    }
};
exports.startTranscription = startTranscription;
const getTranscription = async (req, res) => {
    const { transcriptId } = req.body;
    try {
        if (!transcriptId) {
            return res.status(400).json({ error: "Transcript ID is required in the URL." });
        }
        console.log(`Checking status for AssemblyAI transcript ID: ${transcriptId}`);
        const transcript = await client.transcripts.get(transcriptId);
        if (transcript.status === "completed") {
            console.log(`Transcript ID ${transcriptId} is COMPLETE.`);
            return res.status(200).json({
                transcriptId: transcript.id,
                status: transcript.status,
                transcriptText: transcript.text,
            });
        }
        else if (transcript.status === "error") {
            console.error("Transcription error from AssemblyAI:", transcript.error);
            return res.status(500).json({
                transcriptId: transcript.id,
                status: transcript.status,
                error: transcript.error,
            });
        }
        else {
            console.log(`Transcription ID ${transcriptId} is still in progress. Current status: ${transcript.status}`);
            return res.status(202).json({
                message: "Transcription still in progress. Please try again later.",
                transcriptId: transcript.id,
                status: transcript.status,
            });
        }
    }
    catch (error) {
        console.error("Error in getTranscription:", error);
        if (error instanceof Error) {
            return res.status(500).json({ error: "Internal Server Error fetching transcript status", details: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error fetching transcript status" });
    }
};
exports.getTranscription = getTranscription;
