import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { systemInstructions } from "../config/systemPrompts.js";
import { getGeminiModel } from "../libs/gemini.js";
import { supabase } from "../libs/supabaseClient.js";
import pdfParse from "pdf-parse-fork"
import { Messages } from "../types/messageTypes.js";



export const handleChatMessage = async (req: Request, res: Response) => {
    const { prompt, id, userId = null, history } = req.body;
    const file = req.file

    console.log(id)

    console.log(file)

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

        let parsedHistory: any[] = [];

        if (typeof history === "string") {
            try {
                parsedHistory = JSON.parse(history);
            } catch (e) {
                console.error("Failed to parse history JSON:", e);
                parsedHistory = [];
            }
        } else if (Array.isArray(history)) {
            parsedHistory = history;
        }

        const formattedHistoryRaw = parsedHistory.filter(
            (msg: Messages) => msg.content && typeof msg.content === "string"
        );

        if (formattedHistoryRaw.length && formattedHistoryRaw[0].role !== 'user') {
            // If first message is not from user, remove it
            formattedHistoryRaw.shift();
        }

        const formattedHistory = formattedHistoryRaw.map((msg: Messages) => ({
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
            const filePath = file
                ? `user-${userId}/${Date.now()}-${file.originalname}`
                : null;

            if (file) {
                const { error: uploadError } = await supabase.storage
                    .from("message-files")
                    .upload(filePath as string, file.buffer, {
                        contentType: file.mimetype,
                    });

                if (uploadError) {
                    console.log("File upload error:", uploadError.message);
                }
            }

            const { data, error } = await supabase.from("messages").insert([
                {
                    user_id: userId,
                    id: id,
                    role: "user",
                    content: prompt,
                    file_name: file?.originalname || null,
                    file_size: file?.size || null,
                    file_type: file?.mimetype || null,
                    file_path: filePath,
                },
                {
                    user_id: userId,
                    id: uuidv4(),
                    role: "assistant",
                    content: geminiText,
                },
            ]);

            if (error) {
                res.status(400).json({ success: false, message: error.message });
                return;
            }

            console.log("Inserted messages:", data);
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

export const editMessage = async (req: Request, res: Response) => {
    const { messageId, userId, newPrompt, history } = req.body;

    console.log(req)

    try {
        // 1️⃣ Update the user's edited message
        const { data: updatedMessage, error: updateError } = await supabase
            .from("messages")
            .update({ content: newPrompt })
            .eq("id", messageId)
            .eq("user_id", userId)
            .select();

        if (updateError) {
            res.status(400).json({ success: false, message: updateError.message });
            return
        }

        console.log("Updated message:", updatedMessage);

        // 2️⃣ Format history for Gemini
        const formattedHistory = (history || [])
            .filter((msg: Messages) => msg.content && typeof msg.content === "string")

            .map((msg: Messages) => ({
                role: msg.role === "assistant" ? "model" : msg.role,
                parts: [{ text: msg.content }],
            }));

        if (formattedHistory.length && formattedHistory[0].role !== 'user') {
            // If first message is not from user, remove it
            formattedHistory.shift();
        }



        // 3️⃣ Get new Gemini response
        const model = getGeminiModel();
        const chat = model.startChat({
            history: formattedHistory,
            systemInstruction: systemInstructions,
        });

        const result = await chat.sendMessage(newPrompt);
        const geminiText = result.response.text();

        // 4️⃣ Save new assistant reply
        const { error: insertError } = await supabase.from("messages").insert([
            {
                id: uuidv4(),
                user_id: userId,
                role: "assistant",
                content: geminiText,
            },
        ]);

        if (insertError) {
            res.status(400).json({ success: false, message: insertError.message });
            return;
        }

        res.status(200).json({ success: true, geminiText });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
        return
    }
};