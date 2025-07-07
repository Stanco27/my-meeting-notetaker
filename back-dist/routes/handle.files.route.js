"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meeting_test_1 = require("../controller/meeting-test");
const Assemblyai_1 = require("../controller/Assemblyai");
const router = (0, express_1.Router)();
// Create all the endpoints for handling files after creating the logic
router.post("/Test", meeting_test_1.meetingTest);
router.post("/TranscribeAudio", Assemblyai_1.startTranscription);
router.get("/getTranscription", Assemblyai_1.getTranscription);
exports.default = router;
