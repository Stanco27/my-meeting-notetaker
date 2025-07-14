"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPrompt = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groqApiKey = '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';
const apiEndpoint = `https://api.groq.com/v1/models/`;
let requestBody = {
    prompt: 'Add your prompt here',
    max_tokens: 50,
    temperature: 0.7,
    model: "llama3-8b-8192"
};
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${groqApiKey}`,
};
const groq = new groq_sdk_1.default({ apiKey: groqApiKey });
//   const completion = await groq.chat.completions
//     .create({
//       messages: [
//         {
//           role: "user",
//           content: "Explain the importance of fast language models",
//         },
//       ],
//       model: "llama-3.3-70b-versatile",
//     })
//     .then((chatCompletion) => {
//       console.log(chatCompletion.choices[0]?.message?.content || "");
//     });
// }
// main();
const testPrompt = async (req, res) => {
    const { groqPrompt } = req.body;
    if (!groqPrompt || typeof groqPrompt !== 'string' || groqPrompt.trim() === '') {
        return res.status(400).json({
            error: 'A valid prompt string is required in the request body.',
        });
    }
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: groqPrompt,
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
