import { Request, Response } from "express";
import { systemInstructions } from "../config/systemPrompts.js";
import { getGeminiModel } from "../libs/gemini.js";
import { supabase } from "../libs/supabaseClient.js";
import pdfParse from "pdf-parse-fork"
import { Messages } from "../types/messageTypes.js";



export const handleChatMessage = async (req: Request, res: Response) => {
    const { prompt, userId = null, history } = req.body;
    const file = req.file

    console.log(prompt)

    console.log(history)

    try {
        let finalPrompt = prompt;

        if (file) {

            let fileText = "";

            if (file.mimetype === "application/pdf") {
                const pdfData = await pdfParse(file.buffer);
                fileText = pdfData.text.slice(0, 8000);
            }
            finalPrompt += `

The user has attached a file named "${file.originalname}".
Below is the content of the file:

---------------- FILE CONTENT START ----------------
${fileText}
----------------- FILE CONTENT END -----------------

Please consider this content when writing the email, especially if personalization or resume data is relevant.`;
        }

        const formattedHistory = (history || [])
            .filter((msg: Messages) => msg.content && typeof msg.content === 'string')
            .map((msg: Messages) => ({
                role: msg.role === 'assistant' ? 'model' : msg.role,
                parts: [{ text: msg.content }],
            }));

        const model = getGeminiModel();

        const chat = model.startChat({
            history: formattedHistory,
            systemInstruction: systemInstructions
        })

        const result = chat.sendMessage(finalPrompt);
        const geminiText = (await result).response.text();


        if (userId) {
            const { data, error } = await supabase.from("messages").insert([
                {
                    user_id: userId,
                    role: "user",
                    content: finalPrompt
                },
                {
                    user_id: userId,
                    role: "assistant",
                    content: geminiText
                }
            ])
            if (error) {
                res.status(400).json({ success: false, message: error.message })
                return;
            }

            console.log(data)
        }

        console.log(geminiText)
        res.status(200).json({ success: true, geminiText })
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
        console.log(error)
        return;
    }
}