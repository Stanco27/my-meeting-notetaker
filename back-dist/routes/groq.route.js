"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Groq_Ai_1 = require("../controller/Groq-Ai");
const router = (0, express_1.Router)();
router.get("/testPrompt", Groq_Ai_1.testPrompt);
exports.default = router;
