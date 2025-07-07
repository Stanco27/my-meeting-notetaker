"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranscription = exports.startTranscription = void 0;
const assemblyai_1 = require("assemblyai");
const client = new assemblyai_1.AssemblyAI({
    apiKey: "029ebd87f6d44e48868ad8f5884c06e5"
});
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
