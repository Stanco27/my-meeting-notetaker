"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assemblyai_1 = require("assemblyai");
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const Assemblyai = async ({ audioFile }) => {
    const baseUrl = "https://api.assemblyai.com";
    const headers = {
        auth: ""
    };
    const client = new assemblyai_1.AssemblyAI({
        apiKey: headers.auth,
    });
    const audioData = fs_extra_1.default.readFileSync(audioFile);
    const uploadResponse = await axios_1.default.post(`${baseUrl}/v2/upload`, audioData, {
        headers,
    });
    const audioUrl = uploadResponse.data.upload_url;
    const params = {
        audio: audioUrl,
        speech_model: "universal",
    };
    const run = async () => {
        const transcript = await client.transcripts.transcribe(params);
        console.log(transcript.text);
    };
    run();
};
exports.default = Assemblyai;
