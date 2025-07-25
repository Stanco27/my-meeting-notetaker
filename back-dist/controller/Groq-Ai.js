"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPrompt = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const groqApiKey = process.env.GROQ_API_KEY || '';
const groq = new groq_sdk_1.default({ apiKey: groqApiKey });
const testPrompt = async (req, res) => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Say Hi, this is a test prompt for Groq AI.",
                },
            ],
            model: "llama-3.3-70b-versatile",
        });
        const content = completion.choices[0]?.message?.content;
        if (!content) {
            return res.status(500).json({
                error: 'No content returned from Groq API.',
            });
        }
        return res.status(200).json({
            message: content,
        });
    }
    catch (error) {
        console.error('Error during Groq API request:', error);
        return res.status(500).json({
            error: 'An error occurred while processing your request.',
        });
    }
};
exports.testPrompt = testPrompt;
