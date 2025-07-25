"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Groq_Ai_1 = require("../controller/Groq-Ai");
const router = (0, express_1.Router)();
router.get("/getMainTopics", Groq_Ai_1.getMainTopics);
router.post("/createFlashCards", Groq_Ai_1.createFlashCards);
exports.default = router;
