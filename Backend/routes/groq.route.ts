import { Router } from "express";
import { testPrompt } from "../controller/Groq-Ai";

const router = Router();

router.get("/testPrompt", testPrompt);

export default router;
