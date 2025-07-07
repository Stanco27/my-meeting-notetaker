import { Router } from "express";
import { getTranscription, startTranscription } from "../controller/Assemblyai";

const router = Router();

// Create all the endpoints for handling files after creating the logic
router.post("/TranscribeAudio", startTranscription);
router.get("/getTranscription", getTranscription);


export default router;