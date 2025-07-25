import axios from 'axios';
import { Request, Response } from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();    

const groqApiKey = process.env.GROQ_API_KEY || '';

const groq = new Groq({ apiKey: groqApiKey });

export const testPrompt = async (req: Request, res: Response): Promise<any> => {
    

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

            if( !content) {
                return res.status(500).json({
                    error: 'No content returned from Groq API.',
                });
            }

            return res.status(200).json({
                message: content,
            });

        } catch (error) {
        console.error('Error during Groq API request:', error);
        return res.status(500).json({
            error: 'An error occurred while processing your request.',
        });
    }
}