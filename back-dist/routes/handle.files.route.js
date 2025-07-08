"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Assemblyai_1 = require("../controller/Assemblyai");
const router = (0, express_1.Router)();
// Create all the endpoints for handling files after creating the logic
router.post("/TranscribeAudio", Assemblyai_1.startTranscription);
router.get("/getTranscription", Assemblyai_1.getTranscription);
router.post("/uploadAudioFile", Assemblyai_1.uploadAudioFile);
exports.default = router;
