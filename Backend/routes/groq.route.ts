import { Router } from "express";
import { testPrompt } from "../controller/Groq-Ai";

const router = Router();

router.post("/testPrompt", testPrompt);

export default router;
