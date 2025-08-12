import axios from 'axios';
import { Request, Response } from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();    

const groqApiKey = process.env.GROQ_API_KEY || '';

const groq = new Groq({ apiKey: groqApiKey });

export const getMainTopics = async (req: Request, res: Response): Promise<any> => {

    const { transcript } = req.body;

    if (!transcript) { 
        return res.status(400).json({ error: "No prompt provided." });
    }

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `Could you please provide the 3 main topics of this text. Could you also have all the main topics to start with this "-":  ${transcript} please dont use any other characters or symbols, just the main topics with a "-" in front of each one. These should be TOPICS, not sections like "Introduction" or "Conclusion". For example, if the text is about "Climate Change", the main topics could be "- Causes", "- Effects", "- Solutions". Please provide only the main topics, each starting with a "-".`,    
                    },
                ],
                model: "llama-3.3-70b-versatile",
            });

            const content = completion.choices[0]?.message?.content;

            if( !content) {
                return res.status(500).json({
                    error: 'No content returned from Groq API.',
                });
            }

            const mainTopics = content.split('\n').map(line => line.trim()).filter(line => line.startsWith('-')).map(line => line.replace(/^-/, '').trim());

            return res.status(200).json({
                mainTopics: mainTopics,
            });

        } catch (error) {
        console.error('Error during Groq API request:', error);
        return res.status(500).json({
            error: 'An error occurred while processing your request.',
        });
    }
}

export const createFlashCards = async (req: Request, res: Response): Promise<any> => {
    const { mainTopics } = req.body;


    if (!mainTopics || !Array.isArray(mainTopics)) {
        return res.status(400).json({ error: "No main topics provided." });
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Based on the following main topics: ${mainTopics.join(', ')}, create 3 to 5 random multiple-choice questions. Each question must have 4 options labeled A, B, C, and D. Format each question set clearly.
                    
                    Example Format:
                    Question: What is the capital of France?
                    Options: A) Berlin, B) Madrid, C) Paris, D) Rome
                    Answer: C

                    Question: What is the largest ocean on Earth?
                    Options: A) Atlantic, B) Indian, C) Pacific, D) Arctic
                    Answer: C`,
                },
            ],
            model: "llama-3.3-70b-versatile",
            max_tokens: 1000,
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;
        
        if (!content) {
            return res.status(500).json({
                error: 'No content returned from Groq API.',
            });
        }

        const flashcards: { question: string, options: string[], answer: string }[] = [];
        const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');

        let currentFlashcard: { question: string, options: string[], answer: string } | null = null;


        for (const line of lines) {
            const questionMatch = line.match(/^Question:\s*(.*)/i);
            const optionsMatch = line.match(/^Options:\s*(.*)/i);
            const answerMatch = line.match(/^Answer:\s*([A-D])/i);

            if (questionMatch) {
                if (currentFlashcard && currentFlashcard.question && currentFlashcard.options.length === 4 && currentFlashcard.answer) {
                    flashcards.push(currentFlashcard);
                }
                currentFlashcard = { question: questionMatch[1].trim(), options: [], answer: '' };
            } else if (optionsMatch && currentFlashcard) {
                const optionsString = optionsMatch[1].trim();
                const rawOptions = optionsString.split(',').map(opt => opt.trim());
                currentFlashcard.options = rawOptions.map(opt => {
                    const labelMatch = opt.match(/^[A-D]\)[\s-]*(.*)/i);
                    return labelMatch ? labelMatch[1].trim() : opt;
                });

                if (currentFlashcard.options.length > 4) {
                    currentFlashcard.options = currentFlashcard.options.slice(0, 4);
                } else if (currentFlashcard.options.length < 4) {
                    console.warn(`Flashcard options incomplete for question: "${currentFlashcard.question}"`);
                }

            } else if (answerMatch && currentFlashcard) {
                currentFlashcard.answer = answerMatch[1].trim().toUpperCase();
            }
        }

        if (currentFlashcard && currentFlashcard.question && currentFlashcard.options.length === 4 && currentFlashcard.answer) {
            flashcards.push(currentFlashcard);
        }

        return res.status(200).json({
            flashcards: flashcards,
        });



    } catch (error) {
        console.error('Error creating flashcards:', error);
        return res.status(500).json({
            error: 'An error occurred while creating flashcards.',
        });
    }
}