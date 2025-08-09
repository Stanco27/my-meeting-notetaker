import { Router } from "express";
import { createFlashCards, getMainTopics } from "../controller/Groq-Ai";

const router = Router();

router.post("/getMainTopics", getMainTopics);
router.post("/createFlashCards", createFlashCards);

export default router;
