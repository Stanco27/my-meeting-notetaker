import { Router } from "express";
import { getTranscription, startTranscription, uploadAudioFile } from "../controller/Assemblyai";
import { upload } from "..";

const router = Router();

// Create all the endpoints for handling files after creating the logic
router.post("/TranscribeAudio", startTranscription);
router.get("/getTranscription", getTranscription);
router.post("/uploadAudioFile", uploadAudioFile);


export default router;