import { AssemblyAI } from "assemblyai";
import axios from "axios";
import fs from "fs-extra";

type AssemblyaiProps = {
  audioFile: string;
};

const Assemblyai = async ({ audioFile }: AssemblyaiProps) => {
  const baseUrl = "https://api.assemblyai.com";

  const headers = {
    auth: "029ebd87f6d44e48868ad8f5884c06e5"
  }

  const client = new AssemblyAI({
    apiKey: headers.auth,
  });

  const audioData = fs.readFileSync(audioFile);
  const uploadResponse = await axios.post(`${baseUrl}/v2/upload`, audioData, {
    headers,
  });

  const audioUrl = uploadResponse.data.upload_url;

  const params = {
    audio: audioUrl,
    speech_model: "universal" as const,
  };

  const run = async () => {
    const transcript = await client.transcripts.transcribe(params);

    console.log(transcript.text);
  };
  run();
};

export default Assemblyai;
