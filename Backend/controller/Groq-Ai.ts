import { Request, Response } from 'express';
import Groq from 'groq-sdk';

const groqApiKey = '';

const groq = new Groq({ apiKey: groqApiKey });

export const testPrompt = async (req: Request, res: Response): Promise<any> => {

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