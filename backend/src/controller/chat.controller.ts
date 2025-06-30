import { Request, Response } from "express";
import { buildFinalPrompt, refineMessagePrompt, systemInstructions } from "../config/systemPrompts.js";
import { getGeminiModel } from "../libs/gemini.js";
import { supabase } from "../libs/supabaseClient.js";
import { Messages } from "../types/messageTypes.js";
import { sendEmailUsingGmail } from "../services/email/email.config.js";
import { isEmail, mentionsAttachmentKeywords } from "../libs/constants.js";



export const handleChatMessage = async (req: Request, res: Response): Promise<void> => {
    const { prompt, id, userId = null, history, assistantId } = req.body;
    const file = req.file

    try {
        const finalPrompt = await buildFinalPrompt({ prompt, file });

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

        // Filter out invalid or empty messages
        const formattedHistoryRaw = parsedHistory.filter(
            (msg: Messages) => msg.content && typeof msg.content === "string"
        );

        while (formattedHistoryRaw.length && formattedHistoryRaw[0].role !== "user") {
            formattedHistoryRaw.shift();
        }

        const formattedHistory = formattedHistoryRaw.map((msg: Messages) => ({
            role: msg.role === "assistant" ? "model" : msg.role,
            parts: [{ text: msg.content }],
        }));

        if (formattedHistory.length && formattedHistory[0].role !== "user") {
            console.error("❌ Gemini error: First message still not from user");
            res.status(400).json({ success: false, message: "Chat history invalid" });
            return
        }
        const model = getGeminiModel();

        const chat = model.startChat({
            history: formattedHistory,
            systemInstruction: systemInstructions
        })

        let geminiText = "";
        try {
            const result = await chat.sendMessage(finalPrompt);
            geminiText = result.response.text();
        } catch (err: any) {
            console.error("❌ Gemini API error:", err);

            const errorMessage = err?.message?.toLowerCase() ?? "";

            if (errorMessage.includes("quota") || errorMessage.includes("token") || errorMessage.includes("exceeded")) {
                res.status(429).json({
                    success: false,
                    message: "AI is currently unavailable due to usage limits. Please try again later.",
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: "AI failed to generate a response. Please try again.",
            });
            return;
        }

        const lowercasePrompt = prompt.toLowerCase();

        const shouldSendAsAttachment = mentionsAttachmentKeywords.some(keyword =>
            lowercasePrompt.includes(keyword)
        );

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

            const { error } = await supabase.from("messages").insert([
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
                    id: assistantId,
                    role: "assistant",
                    content: geminiText,
                    email_draft: isEmail,
                    file_path: shouldSendAsAttachment ? filePath : null,
                    file_name: shouldSendAsAttachment ? file?.originalname : null,
                    file_size: shouldSendAsAttachment ? file?.size : null,
                    file_type: shouldSendAsAttachment ? file?.mimetype : null,
                },
            ]);

            if (error) {
                res.status(400).json({ success: false, message: error.message });
                return;
            }

        }


        res.status(200).json({ success: true, geminiText })
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
        console.log(error)
        return;
    }
}

export const editMessage = async (req: Request, res: Response) => {
    const { messageId, userId, newPrompt, history, assistantId } = req.body;

    try {

        if (userId) {
            const { error: updateError } = await supabase
                .from("messages")
                .update({ content: newPrompt })
                .eq("id", messageId)
                .eq("user_id", userId)
                .select();

            if (updateError) {
                res.status(400).json({ success: false, message: updateError.message });
                return
            }
        }

        const formattedHistory = (history || [])
            .filter((msg: Messages) => msg.content && typeof msg.content === "string")

            .map((msg: Messages) => ({
                role: msg.role === "assistant" ? "model" : msg.role,
                parts: [{ text: msg.content }],
            }));

        if (formattedHistory.length && formattedHistory[0].role !== 'user') {
            formattedHistory.shift();
        }

        const model = getGeminiModel();
        const chat = model.startChat({
            history: formattedHistory,
            systemInstruction: systemInstructions,
        });

        let geminiText = "";
        try {
            const result = await chat.sendMessage(newPrompt);
            geminiText = result.response.text();
        } catch (err: any) {
            console.error("❌ Gemini refine error:", err);
            const errorMessage = err?.message?.toLowerCase() ?? "";

            if (errorMessage.includes("quota") || errorMessage.includes("token") || errorMessage.includes("exceeded")) {
                res.status(429).json({
                    success: false,
                    message: "AI is currently unavailable due to usage limits. Please try again later.",
                });
                return
            }

            res.status(500).json({
                success: false,
                message: "AI failed to refine the message. Please try again.",
            });
            return
        }
        const { error: insertError } = await supabase.from("messages").insert([
            {
                id: assistantId,
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

export const refineMessage = async (req: Request, res: Response) => {
    const { userId, originalText, action, assistantId } = req.body;

    try {
        const model = getGeminiModel();
        const prompt = refineMessagePrompt(originalText, action);

        const chat = model.startChat({
            history: [],
            systemInstruction: systemInstructions,
        });

        let geminiText = "";
        try {
            const result = await chat.sendMessage(prompt);
            geminiText = result.response.text();
        } catch (err: any) {
            console.error("Gemini refine error:", err);
            const errorMessage = err?.message?.toLowerCase() ?? "";

            if (errorMessage.includes("quota") || errorMessage.includes("token") || errorMessage.includes("exceeded")) {
                res.status(429).json({
                    success: false,
                    message: "AI is currently unavailable due to usage limits. Please try again later.",
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: "AI failed to refine the message. Please try again.",
            });
            return;
        }

        if (userId) {
            const { error } = await supabase.from("messages").insert([
                {
                    id: assistantId,
                    user_id: userId,
                    role: "assistant",
                    content: geminiText,
                },
            ]);

            if (error) {
                res.status(400).json({ success: false, message: error.message });
                return
            }
        }

        res.status(200).json({ success: true, geminiText });
        return

    } catch (error) {
        console.error("Refine error:", error);
        res.status(500).json({ success: false, message: "Server error" });
        return
    }
}

export const sendEmail = async (req: Request, res: Response) => {
    const { emailTo, subject, html, msgId } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).json({ success: false, message: "Missing Supabase token" });
        return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }

    const userId = userData.user.id;

    // Get Gmail credentials
    const { data: tokenRows, error: fetchError } = await supabase
        .from("gmail_tokens")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })
        .limit(1);

    if (fetchError || !tokenRows?.length) {
        res.status(400).json({ success: false, message: "No Gmail credentials found" });
        return;
    }
    const tokenRow = tokenRows[0];


    const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("id", msgId)
        .eq("user_id", userId)
        .limit(1);

    if (messagesError || !messagesData?.length) {
        res.status(404).json({ success: false, message: messagesError?.message });
        return;
    }

    const draft = messagesData[0];
    if (!isEmail) {
        res.status(400).json({ success: false, message: "This is not an email draft" });
        return;
    }

    // Check if user mentioned any keyword like "attach my resume"
    const normalize = (s: string) =>
        s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

    const mentionsAttachment = mentionsAttachmentKeywords.some(keyword =>
        normalize(draft.content).includes(normalize(keyword))
    );

    let attachment = null;

    if (draft.file_path && mentionsAttachment) {
        const { data: fileData, error: fileError } = await supabase.storage
            .from("message-files")
            .download(draft.file_path);

        if (!fileError && fileData) {
            const arrayBuffer = await fileData.arrayBuffer();
            attachment = {
                filename: draft.file_name,
                content: Buffer.from(arrayBuffer),
                contentType: draft.file_type,
            };
        }
    }

    try {
        await sendEmailUsingGmail({
            to: emailTo,
            subject,
            html,
            userEmail: tokenRow.email,
            refreshToken: tokenRow.refresh_token,
            attachment: attachment ?? undefined,
        });


        res.status(200).json({ success: true, message: "Email sent successfully" });
        return;
    } catch (err) {
        console.error("Send error:", err);
        res.status(500).json({ success: false, message: "Failed to send email" });
        return;
    }
};

